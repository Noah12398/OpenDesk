import express from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateUser, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/resources - Fetch all approved resources with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, pincode, search } = req.query;
    
    let query = supabase
      .from('resources')
      .select('*')
      .eq('status', 'Approved');
    
    // Apply filters if provided
    if (category && category !== 'All') {
      query = query.eq('category', category);
    }
    
    if (pincode) {
      query = query.eq('pincode', pincode);
    }
    
    if (search) {
      query = query.or(`name.ilike.%${search}%,address.ilike.%${search}%`);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    
    res.json({
      success: true,
      data: data || [],
      count: data?.length || 0
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch resources',
      message: error.message
    });
  }
});

// GET /api/resources/pending - Fetch all pending resources (for admin dashboard)
router.get('/pending', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('status', 'Pending')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    res.json({
      success: true,
      data: data || [],
      count: data?.length || 0
    });
  } catch (error) {
    console.error('Error fetching pending resources:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pending resources',
      message: error.message
    });
  }
});

// GET /api/resources/:id - Fetch single resource by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Resource not found'
        });
      }
      throw error;
    }
    
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error fetching resource:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch resource',
      message: error.message
    });
  }
});

// POST /api/resources - Submit new resource
router.post('/', authenticateUser, async (req, res) => {
  try {
    const {
      name,
      category,
      address,
      pincode,
      coordinates,
      hours,
      facilities,
      cost,
      contact,
      description,
      submitted_by
    } = req.body;
    
    // Validate required fields
    if (!name || !category || !address || !coordinates) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        required: ['name', 'category', 'address', 'coordinates']
      });
    }
    
    // Validate coordinates format
    if (!Array.isArray(coordinates) || coordinates.length !== 2) {
      return res.status(400).json({
        success: false,
        error: 'Invalid coordinates format. Expected [latitude, longitude]'
      });
    }
    
    // Validate category
    const validCategories = [
      'Libraries',
      'Study Centers',
      'Free Tuition NGOs',
      'Public Wi-Fi',
      'Book Banks',
      'Community Classrooms'
    ];
    
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid category',
        validCategories
      });
    }
    
    // Insert resource with Pending status and properly bypass RLS if using service key
    // We explicitly set user_id and submitted_by from the authenticated request
    const { data, error } = await supabase
      .from('resources')
      .insert([{
        name,
        category,
        address,
        pincode: pincode || null,
        coordinates,
        hours: hours || null,
        facilities: facilities || [],
        cost: cost || 'Free',
        contact: contact || null,
        description: description || null,
        status: 'Pending',
        // Explicitly set user details from auth middleware
        user_id: req.user.id,
        submitted_by: req.user.email || submitted_by || 'Anonymous'
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    res.status(201).json({
      success: true,
      message: 'Resource submitted successfully. It will be reviewed before publishing.',
      data
    });
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit resource',
      message: error.message
    });
  }
});

// PATCH /api/resources/:id/approve - Approve a pending resource
router.patch('/:id/approve', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('resources')
      .update({ status: 'Approved' })
      .eq('id', id)
      .eq('status', 'Pending')
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Pending resource not found'
        });
      }
      throw error;
    }
    
    res.json({
      success: true,
      message: 'Resource approved successfully',
      data
    });
  } catch (error) {
    console.error('Error approving resource:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to approve resource',
      message: error.message
    });
  }
});

// PATCH /api/resources/:id/reject - Reject a pending resource
router.patch('/:id/reject', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('resources')
      .update({ status: 'Rejected' })
      .eq('id', id)
      .eq('status', 'Pending')
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Pending resource not found'
        });
      }
      throw error;
    }
    
    res.json({
      success: true,
      message: 'Resource rejected',
      data
    });
  } catch (error) {
    console.error('Error rejecting resource:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reject resource',
      message: error.message
    });
  }
});

export default router;

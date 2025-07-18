module.exports = function authorizeRole(role){
  return (req,res,next)=>{
    if (req.user.role !== role){
      req.flash('error',"Access denied! only admin can perform the action!")
      return res.redirect('/user/login') // User is allowed
    }
    next()
  }
}

//------------------default export^^^^^^^^^^^^^^^^^^^^^^

//  When to Use exports.authorizeUser vs authorizeRole('user')?

// Flexibility |	Best Use
// 1. authorizeUser (direct export)	
// Flexibility : Fixed for one role only	
// Best Use : When you want a separate middleware file per role

// 2. authorizeRole('user') (factory function)
// Flexibility : Reusable for any role	
// Best Use : When you want one dynamic middleware for all roles
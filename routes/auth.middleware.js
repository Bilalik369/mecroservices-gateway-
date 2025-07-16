import jwt from 'jsonwebtoken';
import axios from 'axios';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token d\'accès requis'
      });
    }

    const authResponse = await axios.get(`${process.env.AUTH_SERVICE_URL}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!authResponse.data.success) {
      return res.status(401).json({
        success: false,
        message: 'Token invalide'
      });
    }


    req.user = authResponse.data.user;
    next();

  } catch (error) {
    console.error('Erreur de vérification du token:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Token invalide ou service d\'authentification indisponible'
    });
  }
};


export const checkRole  = (allowedRoles)=>{
    return (req , res , next)=>{
        if(!req.user){
            return res.status(404).json({
                success : false,
                message : "Utilisateur non authentifié"
            })
        }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                success :false , 
                message : "Accès refusé - Rôle insuffisant"
            })
        }
        next();

    }
}

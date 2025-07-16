import { error } from "console";
import { createProxyMiddleware } from "http-proxy-middleware";




const services = {
    auth: {
        target: process.env.AUTH_SERVICE_URL ,
        pathRewrite: { '^/api/auth': '/api/auth' }
      },
      apprenants: {
        target: process.env.APPRENANT_SERVICE_URL ,
        pathRewrite: { '^/api/apprenants': '/api' }
      },
      briefs: {
        target: process.env.BRIEF_SERVICE_URL,
        pathRewrite: { '^/api/briefs': '/api' }
      },
      competences: {
        target: process.env.COMPETENCE_SERVICE_URL,
        pathRewrite: { '^/api/competences': '/api' }
      }
    };



    export const createServiceProxy = (serviceName) => {
        const serviceConfig = services[serviceName];
        
        if (!serviceConfig) {
          throw new Error(`Service ${serviceName} non configuré`);
        }
      
        return createProxyMiddleware({
          target: serviceConfig.target,
          changeOrigin: true,
          pathRewrite: serviceConfig.pathRewrite,
          onError: (err, req, res) => {
            console.error(`Erreur proxy vers ${serviceName}:`, err.message);
            res.status(503).json({
              success: false,
              message: `Service ${serviceName} indisponible`
            });
          },
          onProxyReq: (proxyReq, req, res) => {
           
            if (req.user) {
              proxyReq.setHeader('X-User-Id', req.user.id);
              proxyReq.setHeader('X-User-Role', req.user.role);
              proxyReq.setHeader('X-User-Email', req.user.email);
            }
          }
        });
      };


      
// Dev-server proxy: /api -> Spring Boot backend.
// API_URL is set by compose.yaml when running in Docker; defaults to the local backend.
export default {
  '/api': {
    target: process.env.API_URL ?? 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
  },
};

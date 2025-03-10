module.exports = {
    apps: [
      {
        name: 'nextjs-app',
        script: 'npm',
        args: 'run dev',
        watch: false,
        env: {
          NODE_ENV: 'development',
        },
      },
      {
        name: 'python-backend',
        script: 'python',
        args: 'python-backend/app.py',
        watch: false,
      },
    ],
  };
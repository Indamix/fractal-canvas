const FRAME_DURATION = 16;

const createScheduler = () => {
  let isSheduled = false;
  let jobs = [];

  const schedule = job => {
    jobs.push(job);

    if (!isSheduled) {
      isSheduled = true;
      execute();
    }
  };

  const execute = () => {
    if (!jobs.length) {
      isSheduled = false;
      return;
    }

    const end = Date.now() + FRAME_DURATION;
    while (jobs.length && Date.now() < end) {
      jobs.shift()();
    }

    requestAnimationFrame(execute);
  };

  const start = () => {
    jobs = [];
  };

  return { schedule, start };
};

export default createScheduler;

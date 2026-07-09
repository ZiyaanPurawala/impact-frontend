export const DEFAULT_EXERCISES = [
  { _id: 'ex-1', name: 'Bench Press', muscleGroup: 'chest', equipment: 'barbell' },
  { _id: 'ex-2', name: 'Incline Dumbbell Press', muscleGroup: 'chest', equipment: 'dumbbell' },
  { _id: 'ex-3', name: 'Pull-ups', muscleGroup: 'back', equipment: 'bodyweight', isBodyweight: true },
  { _id: 'ex-4', name: 'Barbell Row', muscleGroup: 'back', equipment: 'barbell' },
  { _id: 'ex-5', name: 'Overhead Press', muscleGroup: 'shoulders', equipment: 'barbell' },
  { _id: 'ex-6', name: 'Lateral Raise', muscleGroup: 'shoulders', equipment: 'dumbbell' },
  { _id: 'ex-7', name: 'Bicep Curl', muscleGroup: 'arms', equipment: 'dumbbell' },
  { _id: 'ex-8', name: 'Tricep Pushdown', muscleGroup: 'arms', equipment: 'cable' },
  { _id: 'ex-9', name: 'Barbell Squat', muscleGroup: 'legs', equipment: 'barbell' },
  { _id: 'ex-10', name: 'Romanian Deadlift', muscleGroup: 'legs', equipment: 'barbell' },
  { _id: 'ex-11', name: 'Plank', muscleGroup: 'core', equipment: 'bodyweight', isBodyweight: true }
];

const epley1RM = (weight, reps) => {
  if (reps === 1) return weight;
  return weight * (1 + reps / 30);
};

export const getInitialSessions = () => {
  const d = (daysAgo) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString();
  };

  return [
    {
      _id: 'session-1',
      name: 'Push Workout A',
      date: d(14),
      durationMinutes: 45,
      mood: 4,
      totalVolume: 1740,
      exercises: [
        {
          exercise: DEFAULT_EXERCISES[0], // Bench Press
          sets: [
            { setNumber: 1, weight: 60, reps: 8, isWarmup: false },
            { setNumber: 2, weight: 60, reps: 8, isWarmup: false },
            { setNumber: 3, weight: 60, reps: 7, isWarmup: false }
          ],
          totalVolume: 1380,
          estimated1RM: 76,
          hasPR: false
        },
        {
          exercise: DEFAULT_EXERCISES[7], // Tricep Pushdown
          sets: [
            { setNumber: 1, weight: 20, reps: 10, isWarmup: false },
            { setNumber: 2, weight: 20, reps: 8, isWarmup: false }
          ],
          totalVolume: 360,
          estimated1RM: 26.67,
          hasPR: false
        }
      ]
    },
    {
      _id: 'session-2',
      name: 'Legs Workout',
      date: d(10),
      durationMinutes: 50,
      mood: 3,
      totalVolume: 3240,
      exercises: [
        {
          exercise: DEFAULT_EXERCISES[8], // Barbell Squat
          sets: [
            { setNumber: 1, weight: 80, reps: 6, isWarmup: false },
            { setNumber: 2, weight: 80, reps: 6, isWarmup: false },
            { setNumber: 3, weight: 80, reps: 5, isWarmup: false }
          ],
          totalVolume: 1360,
          estimated1RM: 96,
          hasPR: false
        },
        {
          exercise: DEFAULT_EXERCISES[9], // Romanian Deadlift
          sets: [
            { setNumber: 1, weight: 90, reps: 8, isWarmup: false },
            { setNumber: 2, weight: 90, reps: 7, isWarmup: false }
          ],
          totalVolume: 1880,
          estimated1RM: 114,
          hasPR: false
        }
      ]
    },
    {
      _id: 'session-3',
      name: 'Pull Workout A',
      date: d(7),
      durationMinutes: 40,
      mood: 5,
      totalVolume: 1238,
      exercises: [
        {
          exercise: DEFAULT_EXERCISES[2], // Pull-ups
          sets: [
            { setNumber: 1, weight: 0, reps: 8, isWarmup: false },
            { setNumber: 2, weight: 0, reps: 6, isWarmup: false }
          ],
          totalVolume: 0,
          estimated1RM: 0,
          hasPR: false
        },
        {
          exercise: DEFAULT_EXERCISES[3], // Barbell Row
          sets: [
            { setNumber: 1, weight: 50, reps: 10, isWarmup: false },
            { setNumber: 2, weight: 50, reps: 9, isWarmup: false }
          ],
          totalVolume: 950,
          estimated1RM: 66.67,
          hasPR: false
        },
        {
          exercise: DEFAULT_EXERCISES[6], // Bicep Curl
          sets: [
            { setNumber: 1, weight: 12, reps: 12, isWarmup: false },
            { setNumber: 2, weight: 12, reps: 12, isWarmup: false }
          ],
          totalVolume: 288,
          estimated1RM: 16.8,
          hasPR: false
        }
      ]
    },
    {
      _id: 'session-4',
      name: 'Push Workout B',
      date: d(4),
      durationMinutes: 45,
      mood: 4,
      totalVolume: 1880,
      exercises: [
        {
          exercise: DEFAULT_EXERCISES[0], // Bench Press
          sets: [
            { setNumber: 1, weight: 60, reps: 8, isWarmup: false },
            { setNumber: 2, weight: 60, reps: 8, isWarmup: false },
            { setNumber: 3, weight: 60, reps: 8, isWarmup: false }
          ],
          totalVolume: 1440,
          estimated1RM: 76,
          hasPR: false
        },
        {
          exercise: DEFAULT_EXERCISES[7], // Tricep Pushdown
          sets: [
            { setNumber: 1, weight: 20, reps: 11, isWarmup: false },
            { setNumber: 2, weight: 20, reps: 11, isWarmup: false }
          ],
          totalVolume: 440,
          estimated1RM: 27.33,
          hasPR: false
        }
      ]
    },
    {
      _id: 'session-5',
      name: 'Legs Workout B',
      date: d(1),
      durationMinutes: 55,
      mood: 5,
      totalVolume: 3540,
      exercises: [
        {
          exercise: DEFAULT_EXERCISES[8], // Barbell Squat
          sets: [
            { setNumber: 1, weight: 80, reps: 8, isWarmup: false },
            { setNumber: 2, weight: 80, reps: 8, isWarmup: false },
            { setNumber: 3, weight: 80, reps: 8, isWarmup: false }
          ],
          totalVolume: 1920,
          estimated1RM: 101.33,
          hasPR: false
        },
        {
          exercise: DEFAULT_EXERCISES[9], // Romanian Deadlift
          sets: [
            { setNumber: 1, weight: 90, reps: 9, isWarmup: false },
            { setNumber: 2, weight: 90, reps: 9, isWarmup: false }
          ],
          totalVolume: 1620,
          estimated1RM: 117,
          hasPR: false
        }
      ]
    }
  ];
};

export const handleMockRequest = (config) => {
  const method = config.method.toLowerCase();
  const url = config.url;

  // Get active user to sandbox demo sessions
  const storedUser = localStorage.getItem('pol_user');
  let userSuffix = 'default';
  if (storedUser) {
    try {
      const userObj = JSON.parse(storedUser);
      userSuffix = userObj.email ? userObj.email.replace(/[^a-zA-Z0-9]/g, '_') : (userObj._id || 'default');
    } catch (e) {}
  }
  const sessionKey = `demo_sessions_${userSuffix}`;

  // Initialize data if not set (seed only for the explicit demo account, start empty for others)
  if (!localStorage.getItem(sessionKey)) {
    let isExplicitDemo = false;
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj.email === 'demo@progressiveoverload.com') {
          isExplicitDemo = true;
        }
      } catch (e) {}
    }
    if (isExplicitDemo) {
      localStorage.setItem(sessionKey, JSON.stringify(getInitialSessions()));
    } else {
      localStorage.setItem(sessionKey, JSON.stringify([]));
    }
  }

  const getDemoSessions = () => JSON.parse(localStorage.getItem(sessionKey));
  const saveDemoSessions = (sess) => localStorage.setItem(sessionKey, JSON.stringify(sess));

  // Parse queries
  const getQueryParams = (urlStr) => {
    const params = {};
    const parts = urlStr.split('?');
    if (parts.length > 1) {
      parts[1].split('&').forEach(p => {
        const [k, v] = p.split('=');
        params[k] = decodeURIComponent(v);
      });
    }
    return params;
  };

  // Re-evaluate PRs for all sessions to build records list
  const getDemoRecords = () => {
    const sessions = getDemoSessions().sort((a, b) => new Date(a.date) - new Date(b.date));
    const prsMap = {}; // key: exerciseId + prType

    for (const session of sessions) {
      for (const entry of session.exercises) {
        const exerciseId = entry.exercise._id || entry.exercise;
        const workingSets = entry.sets.filter(s => !s.isWarmup);
        if (!workingSets.length) continue;

        // 1. Weight PR
        const bestWeight = Math.max(...workingSets.map(s => s.weight));
        updatePRMap(prsMap, exerciseId, 'weight', bestWeight, session);

        // 2. ORM PR
        const best1RM = Math.max(...workingSets.map(s => epley1RM(s.weight, s.reps)));
        updatePRMap(prsMap, exerciseId, 'estimated1RM', parseFloat(best1RM.toFixed(2)), session);

        // 3. Reps PR
        const bestReps = Math.max(...workingSets.map(s => s.reps));
        updatePRMap(prsMap, exerciseId, 'reps', bestReps, session);

        // 4. Volume PR
        const sessionVolume = workingSets.reduce((sum, s) => sum + s.weight * s.reps, 0);
        updatePRMap(prsMap, exerciseId, 'volume', parseFloat(sessionVolume.toFixed(2)), session);
      }
    }

    return Object.values(prsMap).map(pr => {
      const exercise = DEFAULT_EXERCISES.find(e => e._id === pr.exerciseId);
      return {
        ...pr,
        exercise
      };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const updatePRMap = (prsMap, exerciseId, prType, value, session) => {
    const key = `${exerciseId}_${prType}`;
    const existing = prsMap[key];
    const previousBest = existing ? (prType === 'weight' ? existing.weight : prType === 'reps' ? existing.reps : prType === 'estimated1RM' ? existing.estimated1RM : existing.volume) : null;

    if (!existing || value > previousBest) {
      const improvement = previousBest !== null ? parseFloat((value - previousBest).toFixed(2)) : 0;
      prsMap[key] = {
        exerciseId,
        prType,
        date: session.date,
        session: session._id,
        weight: prType === 'weight' ? value : undefined,
        reps: prType === 'reps' ? value : undefined,
        estimated1RM: prType === 'estimated1RM' ? value : undefined,
        volume: prType === 'volume' ? value : undefined,
        previousBest: previousBest ?? 0,
        improvement
      };
    }
  };

  // 0. POST /auth/login
  if (url.startsWith('/auth/login') && method === 'post') {
    const payload = JSON.parse(config.data);
    const email = payload.email;
    const isExplicitDemo = email === 'demo@progressiveoverload.com';
    
    let demoUsers = [];
    try {
      demoUsers = JSON.parse(localStorage.getItem('demo_users') || '[]');
    } catch (e) {}
    
    const matchedUser = demoUsers.find(u => u.email === email);
    
    const payloadPassword = payload.password;
    const isValidDemo = isExplicitDemo;
    const isValidRegistered = matchedUser && matchedUser.password === payloadPassword;
    
    if (!isValidDemo && !isValidRegistered) {
      return Promise.reject({
        response: {
          data: { message: 'Invalid email or password' },
          status: 401,
          statusText: 'Unauthorized'
        }
      });
    }
    
    const data = {
      _id: matchedUser ? `demo-user-${email}` : 'demo-user-123',
      name: matchedUser ? matchedUser.name : 'Guest Lifter',
      email: email,
      unitPreference: matchedUser ? matchedUser.unitPreference : 'kg',
      phoneNumber: matchedUser ? matchedUser.phoneNumber : '',
      token: 'demo-token-xyz'
    };
    return Promise.resolve({ data, status: 200, statusText: 'OK', headers: {}, config });
  }

  // 1. GET /exercises
  if (url.startsWith('/exercises')) {
    return Promise.resolve({ data: DEFAULT_EXERCISES, status: 200, statusText: 'OK', headers: {}, config });
  }

  // 2. GET /records
  if (url.startsWith('/records')) {
    return Promise.resolve({ data: getDemoRecords(), status: 200, statusText: 'OK', headers: {}, config });
  }

  // 3. GET /sessions/strength-curve
  if (url.startsWith('/sessions/strength-curve')) {
    const params = getQueryParams(url);
    const exerciseId = params.exerciseId;
    const sessions = getDemoSessions()
      .filter(s => s.exercises.some(e => (e.exercise._id || e.exercise) === exerciseId))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sessions.map(session => {
      const entry = session.exercises.find(e => (e.exercise._id || e.exercise) === exerciseId);
      const workingSets = entry.sets.filter(s => !s.isWarmup);
      const maxWeight = workingSets.length ? Math.max(...workingSets.map(s => s.weight)) : 0;

      return {
        date: session.date,
        estimated1RM: entry.estimated1RM || 0,
        totalVolume: entry.totalVolume || 0,
        maxWeight
      };
    });

    return Promise.resolve({ data: chartData, status: 200, statusText: 'OK', headers: {}, config });
  }

  // 4. GET /sessions (or /sessions?limit=5)
  if (url.startsWith('/sessions') && method === 'get') {
    const params = getQueryParams(url);
    let sessions = getDemoSessions().sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Make sure exercises.exercise is populated
    sessions = sessions.map(s => ({
      ...s,
      exercises: s.exercises.map(entry => {
        const exId = entry.exercise._id || entry.exercise;
        const exObj = DEFAULT_EXERCISES.find(e => e._id === exId);
        return {
          ...entry,
          exercise: exObj || entry.exercise
        };
      })
    }));

    if (params.limit) {
      sessions = sessions.slice(0, parseInt(params.limit));
    }

    return Promise.resolve({ data: { sessions }, status: 200, statusText: 'OK', headers: {}, config });
  }

  // 5. POST /sessions
  if (url.startsWith('/sessions') && method === 'post') {
    const payload = JSON.parse(config.data);
    const sessions = getDemoSessions();

    const newSession = {
      ...payload,
      _id: 'session-' + Date.now(),
      date: payload.date || new Date().toISOString()
    };

    // Calculate session volume and exercise metrics
    let sessionTotalVolume = 0;
    const recordsBefore = getDemoRecords();

    newSession.exercises = newSession.exercises.map(entry => {
      const exId = entry.exercise._id || entry.exercise;
      const exObj = DEFAULT_EXERCISES.find(e => e._id === exId) || entry.exercise;
      const workingSets = entry.sets.filter(s => !s.isWarmup);

      const best1RM = workingSets.length
        ? Math.max(...workingSets.map(s => epley1RM(s.weight, s.reps)))
        : 0;

      const volume = workingSets.reduce((sum, s) => sum + s.weight * s.reps, 0);
      sessionTotalVolume += volume;

      return {
        ...entry,
        exercise: exObj,
        estimated1RM: parseFloat(best1RM.toFixed(2)),
        totalVolume: parseFloat(volume.toFixed(2)),
        hasPR: false
      };
    });

    newSession.totalVolume = parseFloat(sessionTotalVolume.toFixed(2));

    // Save session temporarily to compute PRs correctly
    sessions.push(newSession);
    saveDemoSessions(sessions);

    // Detect new PRs
    const recordsAfter = getDemoRecords();
    const newPRs = [];

    newSession.exercises.forEach(entry => {
      const exId = entry.exercise._id || entry.exercise;
      const types = ['weight', 'reps', 'estimated1RM', 'volume'];

      types.forEach(t => {
        const afterPR = recordsAfter.find(r => r.exerciseId === exId && r.prType === t && r.session === newSession._id);
        if (afterPR) {
          const beforePR = recordsBefore.find(r => r.exerciseId === exId && r.prType === t);
          const previousBest = beforePR ? (t === 'weight' ? beforePR.weight : t === 'reps' ? beforePR.reps : t === 'estimated1RM' ? beforePR.estimated1RM : beforePR.volume) : 0;
          const value = t === 'weight' ? afterPR.weight : t === 'reps' ? afterPR.reps : t === 'estimated1RM' ? afterPR.estimated1RM : afterPR.volume;
          
          if (!beforePR || value > previousBest) {
            newPRs.push({
              exerciseId: exId,
              exerciseName: entry.exercise.name,
              prType: t,
              value,
              previousBest,
              improvement: previousBest ? value - previousBest : 0
            });
            entry.hasPR = true;
          }
        }
      });
    });

    // Update in-memory sessions with hasPR if any were found
    if (newPRs.length > 0) {
      newSession.hasPR = true;
      saveDemoSessions(sessions);
    }

    return Promise.resolve({ data: { ...newSession, prs: newPRs }, status: 201, statusText: 'Created', headers: {}, config });
  }

  // 6. DELETE /sessions/:id
  if (url.startsWith('/sessions/') && method === 'delete') {
    const id = url.split('/').pop();
    let sessions = getDemoSessions();
    sessions = sessions.filter(s => s._id !== id);
    saveDemoSessions(sessions);

    return Promise.resolve({ data: { message: 'Workout session deleted successfully' }, status: 200, statusText: 'OK', headers: {}, config });
  }

  // 7. GET /ml/predict
  if (url.startsWith('/ml/predict') && method === 'get') {
    const sessions = getDemoSessions();
    const userJson = localStorage.getItem('pol_user');
    const user = userJson ? JSON.parse(userJson) : { name: 'Guest Lifter', phoneNumber: '', whatsappEnabled: true };
    
    // Compute heuristic
    const now = new Date();
    const currentWeekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const prevWeekStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const currSessions = sessions.filter(s => new Date(s.date) >= currentWeekStart);
    const prevSessions = sessions.filter(s => new Date(s.date) >= prevWeekStart && new Date(s.date) < currentWeekStart);

    const getMonToFriCount = (sessList) => {
      return sessList.filter(s => {
        const d = new Date(s.date);
        const day = d.getDay(); // 0 is Sunday, 1-5 is Mon-Fri, 6 is Saturday
        return day >= 1 && day <= 5;
      }).length;
    };

    const currTotal = currSessions.length;
    const currMonFri = getMonToFriCount(currSessions);
    const prevTotal = prevSessions.length;
    const prevMonFri = getMonToFriCount(prevSessions);

    let probability = 0.20;
    if (currMonFri >= 3) probability += 0.35;
    if (prevMonFri >= 3) probability += 0.25;
    if (currTotal >= 4) probability += 0.15;
    if (prevTotal >= 4) probability += 0.05;

    probability = Math.min(0.98, Math.max(0.05, probability));
    const percent = Math.round(probability * 100);
    const category = probability >= 0.7 ? "High" : probability >= 0.4 ? "Moderate" : "Low";
    const firstName = user.name ? user.name.split(' ')[0] : 'Guest';

    let message = "";
    if (category === "High") {
      message = `Hey ${firstName}! 🏋️\n\nYou logged ${currTotal} workouts this week! The Overload AI predicts a ${percent}% chance you'll smash your consistency goals next week. Keep riding the momentum. Let's crush it! 🔥`;
    } else if (category === "Moderate") {
      message = `Hey ${firstName}! 🌟\n\nGreat job logging ${currTotal} workouts this week. The Overload AI predicts a ${percent}% chance of workout consistency next week. Let's schedule your next sessions (Mon/Wed/Fri) to build a streak! You've got this! 💪`;
    } else {
      message = `Hey ${firstName}! 👋\n\nMissed you in the gym this week. The Overload AI consistency prediction for next week is ${percent}%. Remember, small steps lead to big changes. Even a quick 20-minute workout counts! Let's commit to logging just one session on Monday! ⚡`;
    }

    const data = {
      success: true,
      name: user.name,
      phoneNumber: user.phoneNumber || '',
      whatsappEnabled: user.whatsappEnabled !== false,
      isDemoMock: true,
      features: {
        total_sessions: currTotal,
        mon_to_fri_sessions: currMonFri,
        prev_week_sessions: prevTotal,
        prev_week_mon_to_fri_sessions: prevMonFri,
        avg_duration: 45,
        avg_volume: 1500,
        avg_mood: 4
      },
      prediction: {
        adherence_predicted: probability >= 0.5 ? 1 : 0,
        probability,
        category
      },
      message,
      whatsapp: {
        sent: user.phoneNumber ? true : false,
        log: user.phoneNumber ? `[Mock] WhatsApp notification simulated to ${user.phoneNumber}.` : "WhatsApp disabled or phone number not set."
      }
    };
    return Promise.resolve({ data, status: 200, statusText: 'OK', headers: {}, config });
  }

  // 8. POST /ml/settings
  if (url.startsWith('/ml/settings') && method === 'post') {
    const payload = JSON.parse(config.data);
    const userJson = localStorage.getItem('pol_user');
    if (userJson) {
      const user = JSON.parse(userJson);
      user.phoneNumber = payload.phoneNumber;
      user.whatsappEnabled = payload.whatsappEnabled;
      localStorage.setItem('pol_user', JSON.stringify(user));
      
      // Update in demo_users if matched
      try {
        let demoUsers = JSON.parse(localStorage.getItem('demo_users') || '[]');
        demoUsers = demoUsers.map(u => u.email === user.email ? { ...u, phoneNumber: payload.phoneNumber, whatsappEnabled: payload.whatsappEnabled } : u);
        localStorage.setItem('demo_users', JSON.stringify(demoUsers));
      } catch (e) {}
    }
    
    return Promise.resolve({ 
      data: { 
        message: 'WhatsApp notification settings updated successfully',
        phoneNumber: payload.phoneNumber,
        whatsappEnabled: payload.whatsappEnabled
      }, 
      status: 200, 
      statusText: 'OK', 
      headers: {}, 
      config 
    });
  }

  // 9. POST /ml/test-notification
  if (url.startsWith('/ml/test-notification') && method === 'post') {
    const userJson = localStorage.getItem('pol_user');
    const user = userJson ? JSON.parse(userJson) : { name: 'Guest Lifter', phoneNumber: '', whatsappEnabled: true };
    const sessions = getDemoSessions();
    
    const now = new Date();
    const currentWeekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const prevWeekStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const currSessions = sessions.filter(s => new Date(s.date) >= currentWeekStart);
    const prevSessions = sessions.filter(s => new Date(s.date) >= prevWeekStart && new Date(s.date) < currentWeekStart);

    const getMonToFriCount = (sessList) => {
      return sessList.filter(s => {
        const d = new Date(s.date);
        const day = d.getDay();
        return day >= 1 && day <= 5;
      }).length;
    };

    const currTotal = currSessions.length;
    const currMonFri = getMonToFriCount(currSessions);
    const prevTotal = prevSessions.length;
    const prevMonFri = getMonToFriCount(prevSessions);

    let probability = 0.20;
    if (currMonFri >= 3) probability += 0.35;
    if (prevMonFri >= 3) probability += 0.25;
    if (currTotal >= 4) probability += 0.15;
    if (prevTotal >= 4) probability += 0.05;

    probability = Math.min(0.98, Math.max(0.05, probability));
    const percent = Math.round(probability * 100);
    const category = probability >= 0.7 ? "High" : probability >= 0.4 ? "Moderate" : "Low";
    const firstName = user.name ? user.name.split(' ')[0] : 'Guest';

    let message = "";
    if (category === "High") {
      message = `Hey ${firstName}! 🏋️\n\nYou logged ${currTotal} workouts this week! The Overload AI predicts a ${percent}% chance you'll smash your consistency goals next week. Keep riding the momentum. Let's crush it! 🔥`;
    } else if (category === "Moderate") {
      message = `Hey ${firstName}! 🌟\n\nGreat job logging ${currTotal} workouts this week. The Overload AI predicts a ${percent}% chance of workout consistency next week. Let's schedule your next sessions (Mon/Wed/Fri) to build a streak! You've got this! 💪`;
    } else {
      message = `Hey ${firstName}! 👋\n\nMissed you in the gym this week. The Overload AI consistency prediction for next week is ${percent}%. Remember, small steps lead to big changes. Even a quick 20-minute workout counts! Let's commit to logging just one session on Monday! ⚡`;
    }

    const data = {
      success: true,
      name: user.name,
      phoneNumber: user.phoneNumber || '',
      whatsappEnabled: user.whatsappEnabled !== false,
      isDemoMock: true,
      testTriggered: true,
      features: {
        total_sessions: currTotal,
        mon_to_fri_sessions: currMonFri,
        prev_week_sessions: prevTotal,
        prev_week_mon_to_fri_sessions: prevMonFri,
        avg_duration: 45,
        avg_volume: 1500,
        avg_mood: 4
      },
      prediction: {
        adherence_predicted: probability >= 0.5 ? 1 : 0,
        probability,
        category
      },
      message,
      whatsapp: {
        sent: user.phoneNumber ? true : false,
        log: user.phoneNumber ? `[Mock] Test Sunday WhatsApp notification simulated to ${user.phoneNumber} successfully.` : "WhatsApp disabled or phone number not set."
      }
    };
    return Promise.resolve({ data, status: 200, statusText: 'OK', headers: {}, config });
  }

  // 10. POST /ml/train
  if (url.startsWith('/ml/train') && method === 'post') {
    return Promise.resolve({ data: { success: true, message: 'Mock model retrained successfully.' }, status: 200, statusText: 'OK', headers: {}, config });
  }

  // Fallback
  return Promise.reject({ response: { data: { message: 'Not Found' }, status: 404 } });
};

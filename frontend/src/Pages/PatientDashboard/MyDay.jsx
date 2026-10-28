
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Pill,
  Utensils,
  Footprints,
  Check,
  MoreHorizontal,
  Bell,
  Volume2,
  Sun,
  Heart,
  Sparkles,
  Clock3,
  Brain,
  Users,
  Bed,
  Coffee,
  Droplets,
  Pencil,
  Trash2,
  X,
  Sunrise,
  Moon,
  Smile,
  LoaderCircle,
} from "lucide-react";
import "./MyDay.css";

const initialActivities = [
  {
    id: "medicine-morning",
    title: "Morning Medicine",
    description: "Take your morning medicine",
    time: "07:00",
    type: "Medicine",
    done: true,
  },
  {
    id: "water",
    title: "Drink Water",
    description: "Start your day with a glass of water",
    time: "07:30",
    type: "Activity",
    done: true,
  },
  {
    id: "breakfast",
    title: "Breakfast",
    description: "Have a healthy breakfast",
    time: "08:00",
    type: "Meal",
    done: false,
  },
  {
    id: "walk",
    title: "Morning Walk",
    description: "Enjoy a short, gentle walk",
    time: "09:00",
    type: "Exercise",
    done: false,
  },
  {
    id: "lunch",
    title: "Lunch",
    description: "Have your lunch",
    time: "12:30",
    type: "Meal",
    done: false,
  },
  {
    id: "brain-game",
    title: "Brain Game",
    description: "Play a memory game with CLARA",
    time: "14:00",
    type: "Activity",
    done: false,
  },
  {
    id: "tea",
    title: "Tea Time",
    description: "Enjoy a cup of tea",
    time: "16:00",
    type: "Meal",
    done: false,
  },
  {
    id: "family",
    title: "Talk to Family",
    description: "Spend some time with your loved ones",
    time: "18:00",
    type: "Activity",
    done: false,
  },
  {
    id: "medicine-night",
    title: "Night Medicine",
    description: "Take your evening medicine",
    time: "20:00",
    type: "Medicine",
    done: false,
  },
  {
    id: "bedtime",
    title: "Bed Time",
    description: "Time to rest. Good night!",
    time: "21:30",
    type: "Activity",
    done: false,
  },
];

const typeConfig = {
  Activity: {
    icon: Sparkles,
    emoji: "✨",
    color: "purple",
  },
  Medicine: {
    icon: Pill,
    emoji: "💊",
    color: "pink",
  },
  Meal: {
    icon: Utensils,
    emoji: "🥗",
    color: "yellow",
  },
  Exercise: {
    icon: Footprints,
    emoji: "🚶",
    color: "blue",
  },
};

const getStorageKey = () => {
  const patientId = localStorage.getItem("clara_patient_id") || "demo";
  return `clara_my_day_${patientId}`;
};

const formatTime = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;
  return `${displayHour}:${String(minutes).padStart(2, "0")} ${period}`;
};

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDate = (date) =>
  date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const createId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const getInitialState = () => {
  try {
    const saved = localStorage.getItem(getStorageKey());
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (error) {
    console.error("Unable to load CLARA schedule:", error);
  }

  return initialActivities.map((activity) => ({
    ...activity,
    date: getDateKey(new Date()),
  }));
};

const getActivityIcon = (activity) => {
  if (activity.title.toLowerCase().includes("water")) return Droplets;
  if (activity.title.toLowerCase().includes("brain")) return Brain;
  if (activity.title.toLowerCase().includes("family")) return Users;
  if (activity.title.toLowerCase().includes("bed")) return Bed;
  if (activity.title.toLowerCase().includes("tea")) return Coffee;
  if (activity.title.toLowerCase().includes("morning")) return Sunrise;
  if (activity.title.toLowerCase().includes("night")) return Moon;
  return typeConfig[activity.type]?.icon || Sparkles;
};

export default function MyDay() {
  const [activities, setActivities] = useState(getInitialState);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("Today");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [notice, setNotice] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    time: "10:00",
    type: "Activity",
  });

  useEffect(() => {
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(activities));
    } catch (error) {
      console.error("Unable to save CLARA schedule:", error);
      setNotice("Unable to save changes. Your browser storage may be full.");
    }
  }, [activities]);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    const closeMenu = () => setMenuId(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const dayActivities = useMemo(() => {
    const selectedKey = getDateKey(selectedDate);

    return activities
      .filter((activity) => {
        if (activity.date) return activity.date === selectedKey;
        return selectedKey === getDateKey(new Date());
      })
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [activities, selectedDate]);

  const completedCount = dayActivities.filter((item) => item.done).length;
  const totalCount = dayActivities.length;
  const progress = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;
  const nextActivity = dayActivities.find((item) => !item.done);

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning!";
    if (hour < 17) return "Good Afternoon!";
    return "Good Evening!";
  })();

  const dateIsToday = getDateKey(selectedDate) === getDateKey(new Date());

  const changeDate = (amount) => {
    setSelectedDate((current) => {
      const next = new Date(current);
      next.setDate(next.getDate() + amount);
      return next;
    });
  };

  const openAddModal = (type = "Activity") => {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      time: "10:00",
      type,
    });
    setModalOpen(true);
  };

  const openEditModal = (activity) => {
    setEditingId(activity.id);
    setForm({
      title: activity.title,
      description: activity.description || "",
      time: activity.time,
      type: activity.type,
    });
    setMenuId(null);
    setModalOpen(true);
  };

  const saveActivity = (event) => {
    event.preventDefault();

    const title = form.title.trim();
    if (!title) {
      setNotice("Please enter an activity name.");
      return;
    }

    if (editingId) {
      setActivities((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title,
                description: form.description.trim(),
                time: form.time,
                type: form.type,
              }
            : item
        )
      );
      setNotice("Activity updated successfully.");
    } else {
      setActivities((current) => [
        ...current,
        {
          id: createId(),
          title,
          description: form.description.trim(),
          time: form.time,
          type: form.type,
          done: false,
          date: getDateKey(selectedDate),
        },
      ]);
      setNotice(`${form.type} added to your schedule.`);
    }

    setModalOpen(false);
    setEditingId(null);
  };

  const toggleActivity = (id) => {
    setActivities((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
    setNotice("Your schedule has been updated.");
  };

  const deleteActivity = (id) => {
    setActivities((current) => current.filter((item) => item.id !== id));
    setMenuId(null);
    setNotice("Activity removed from your schedule.");
  };

  const speak = (text) => {
    if (!("speechSynthesis" in window)) {
      setNotice("Voice reading is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.88;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const readNextActivity = () => {
    if (!nextActivity) {
      speak("Wonderful! You have completed all the activities in your schedule.");
      return;
    }

    speak(
      `Your next activity is ${nextActivity.title}, at ${formatTime(
        nextActivity.time
      )}. ${nextActivity.description || "Take your time and enjoy."}`
    );
  };

  const readFullSchedule = () => {
    if (!dayActivities.length) {
      speak("There are no activities planned for this day yet.");
      return;
    }

    const schedule = dayActivities
      .map(
        (item) =>
          `${formatTime(item.time)}, ${item.title}. ${
            item.done ? "Completed." : "Not completed yet."
          }`
      )
      .join(". ");

    speak(`Here is your schedule. ${schedule}`);
  };

  const remindMe = (activity) => {
    speak(
      `Friendly reminder. It is time for ${activity.title}, scheduled for ${formatTime(
        activity.time
      )}.`
    );
    setNotice("CLARA is reading your reminder aloud.");
  };

  const visibleActivities = useMemo(() => {
    if (view === "Today") return dayActivities;

    if (view === "Week") {
      const start = new Date(selectedDate);
      const day = start.getDay();
      start.setDate(start.getDate() - ((day + 6) % 7));
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setDate(start.getDate() + 7);

      return activities
        .filter((item) => {
          const date = item.date
            ? new Date(`${item.date}T00:00:00`)
            : new Date();
          return date >= start && date < end;
        })
        .sort((a, b) => {
          const dateCompare = (a.date || "").localeCompare(b.date || "");
          return dateCompare || a.time.localeCompare(b.time);
        });
    }

    return activities
      .filter((item) => {
        const date = item.date
          ? new Date(`${item.date}T00:00:00`)
          : new Date();
        return (
          date.getFullYear() === selectedDate.getFullYear() &&
          date.getMonth() === selectedDate.getMonth()
        );
      })
      .sort((a, b) => {
        const dateCompare = (a.date || "").localeCompare(b.date || "");
        return dateCompare || a.time.localeCompare(b.time);
      });
  }, [activities, dayActivities, selectedDate, view]);

  return (
    <div className="myday-page">
      <div className="myday-top-row">
        <section className="myday-hero">
          <div className="myday-hero-sun">
            <Sun size={72} strokeWidth={1.7} />
          </div>

          <div className="myday-hero-copy">
            <span className="myday-eyebrow">A LITTLE ROUTINE, A LOT OF CARE</span>
            <h1>My Day</h1>
            <h2>Your daily routine for a happier, healthier day.</h2>
            <p>
              Stay on track with your medicines, meals, activities and special
              moments.
            </p>
          </div>

          <div className="myday-hero-art" aria-hidden="true">
            <div className="myday-art-note">
              Small steps
              <br />
              Brighter days <Heart size={14} fill="currentColor" />
            </div>
            <div className="myday-art-person">👵🏻</div>
            <div className="myday-art-plant">🪴</div>
          </div>
        </section>

        <section className="myday-greeting">
          <span>{formatDate(new Date())}</span>
          <h2>
            {greeting} <Heart size={20} fill="currentColor" />
          </h2>
          <p>Let's make it a wonderful day.</p>
          <div className="myday-greeting-sparkle">
            <Sparkles size={18} />
          </div>
        </section>
      </div>

      <section className="myday-quick-actions">
        <button
          className="myday-action-card action-purple"
          onClick={() => openAddModal("Activity")}
        >
          <span className="myday-action-icon"><Plus size={29} /></span>
          <span>
            <strong>Add Activity</strong>
            <small>Add a new task</small>
          </span>
        </button>

        <button
          className="myday-action-card action-pink"
          onClick={() => openAddModal("Medicine")}
        >
          <span className="myday-action-icon"><Pill size={27} /></span>
          <span>
            <strong>Add Medicine</strong>
            <small>Set medicine reminder</small>
          </span>
        </button>

        <button
          className="myday-action-card action-green"
          onClick={() => openAddModal("Meal")}
        >
          <span className="myday-action-icon"><Utensils size={26} /></span>
          <span>
            <strong>Add Meal</strong>
            <small>Plan a meal</small>
          </span>
        </button>

        <button
          className="myday-action-card action-blue"
          onClick={() => openAddModal("Exercise")}
        >
          <span className="myday-action-icon"><Footprints size={27} /></span>
          <span>
            <strong>Add Exercise</strong>
            <small>Add walking or activity</small>
          </span>
        </button>
      </section>

      <div className="myday-content-grid">
        <section className="myday-schedule-panel">
          <header className="myday-schedule-header">
            <div className="myday-section-heading">
              <CalendarDays size={33} />
              <div>
                <h2>{view === "Today" ? "Today's Schedule" : `${view}'s Schedule`}</h2>
                <p>{dateIsToday ? "One step at a time, you've got this." : formatDate(selectedDate)}</p>
              </div>
            </div>

            <div className="myday-schedule-controls">
              <div className="myday-date-control">
                <span>{formatDate(selectedDate)}</span>
                <button
                  aria-label="Previous day"
                  onClick={() => changeDate(-1)}
                >
                  <ChevronLeft size={20} />
                </button>
                <button aria-label="Next day" onClick={() => changeDate(1)}>
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="myday-view-switch">
                {["Today", "Week", "Month"].map((item) => (
                  <button
                    key={item}
                    className={view === item ? "active" : ""}
                    onClick={() => setView(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div className="myday-schedule-list">
            {visibleActivities.length === 0 ? (
              <div className="myday-empty">
                <CalendarDays size={36} />
                <h3>A fresh start!</h3>
                <p>No activities planned for this view.</p>
                <button onClick={() => openAddModal("Activity")}>
                  <Plus size={17} /> Add your first activity
                </button>
              </div>
            ) : (
              visibleActivities.map((activity) => {
                const config = typeConfig[activity.type] || typeConfig.Activity;
                const ActivityIcon = getActivityIcon(activity);
                const activityDate = activity.date
                  ? new Date(`${activity.date}T00:00:00`)
                  : new Date();
                const showDate = view !== "Today";

                return (
                  <article
                    key={activity.id}
                    className={`myday-task-row ${activity.done ? "task-done" : ""}`}
                  >
                    <div className="myday-task-time">
                      {showDate && (
                        <small>
                          {activityDate.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </small>
                      )}
                      <strong>{formatTime(activity.time).split(" ")[0]}</strong>
                      <span>{formatTime(activity.time).split(" ")[1]}</span>
                    </div>

                    <button
                      className={`myday-task-check ${activity.done ? "checked" : ""}`}
                      aria-label={activity.done ? "Mark as not done" : "Mark as done"}
                      onClick={() => toggleActivity(activity.id)}
                    >
                      {activity.done && <Check size={16} strokeWidth={3} />}
                    </button>

                    <div className={`myday-task-icon ${config.color}`}>
                      <ActivityIcon size={25} />
                    </div>

                    <div className="myday-task-details">
                      <div className="myday-task-title-line">
                        <h3>{activity.title}</h3>
                        {activity.done && (
                          <span className="myday-done-tag">
                            <Check size={13} /> Completed
                          </span>
                        )}
                      </div>
                      <p>{activity.description || activity.type}</p>
                    </div>

                    <div className="myday-task-actions">
                      {!activity.done ? (
                        <button
                          className="myday-mark-done"
                          onClick={() => toggleActivity(activity.id)}
                        >
                          <Check size={18} /> Mark Done
                        </button>
                      ) : (
                        <button
                          className="myday-undo-button"
                          onClick={() => toggleActivity(activity.id)}
                        >
                          Undo
                        </button>
                      )}

                      <div className="myday-menu-wrap" onClick={(e) => e.stopPropagation()}>
                        <button
                          className="myday-more-button"
                          aria-label={`Options for ${activity.title}`}
                          onClick={() =>
                            setMenuId((current) =>
                              current === activity.id ? null : activity.id
                            )
                          }
                        >
                          <MoreHorizontal size={22} />
                        </button>

                        {menuId === activity.id && (
                          <div className="myday-dropdown">
                            <button onClick={() => openEditModal(activity)}>
                              <Pencil size={15} /> Edit activity
                            </button>
                            <button onClick={() => remindMe(activity)}>
                              <Bell size={15} /> Read reminder
                            </button>
                            <button
                              className="delete-option"
                              onClick={() => deleteActivity(activity.id)}
                            >
                              <Trash2 size={15} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          <footer className="myday-schedule-footer">
            <span>
              <Sparkles size={16} />
              Every little step counts.
            </span>
            <button onClick={readFullSchedule}>
              <Volume2 size={17} /> Read schedule aloud
            </button>
          </footer>
        </section>

        <aside className="myday-side-panels">
          <section className="myday-side-card myday-progress-card">
            <header className="myday-side-title">
              <span className="side-title-icon orange"><Sun size={20} /></span>
              <h2>Today's Progress</h2>
            </header>

            <div className="myday-progress-content">
              <div
                className="myday-progress-ring"
                style={{ "--progress": `${progress}%` }}
                role="img"
                aria-label={`${completedCount} of ${totalCount} activities completed`}
              >
                <div className="myday-progress-inner">
                  <strong>{completedCount}/{totalCount}</strong>
                  <span>Completed</span>
                </div>
              </div>

              <div className="myday-progress-message">
                <Heart size={22} fill="currentColor" />
                <strong>
                  {progress === 100
                    ? "Amazing work!"
                    : progress >= 50
                    ? "You're doing great!"
                    : "Great start!"}
                </strong>
                <p>
                  You've completed {completedCount} of {totalCount} activities.
                  Keep going!
                </p>
              </div>
            </div>
          </section>

          <section className="myday-side-card myday-next-card">
            <header className="myday-side-title">
              <span className="side-title-icon orange"><CalendarDays size={20} /></span>
              <h2>Next Activity</h2>
            </header>

            {nextActivity ? (
              <div className="myday-next-content">
                <div className="myday-next-illustration">
                  {typeConfig[nextActivity.type]?.emoji || "🌷"}
                </div>
                <div className="myday-next-info">
                  <h3>{nextActivity.title}</h3>
                  <p>Time: {formatTime(nextActivity.time)}</p>
                  <div className="myday-next-buttons">
                    <button
                      className="myday-mark-done"
                      onClick={() => toggleActivity(nextActivity.id)}
                    >
                      <Check size={16} /> Mark Done
                    </button>
                    <button
                      className="myday-remind-button"
                      onClick={() => remindMe(nextActivity)}
                    >
                      <Bell size={16} /> Remind Me
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="myday-all-done">
                <Smile size={35} />
                <strong>All done for now!</strong>
                <p>Enjoy a relaxing moment.</p>
              </div>
            )}
          </section>

          <section className="myday-side-card myday-ask-card">
            <div className="myday-clara-avatar" aria-hidden="true">
              <span>🤖</span>
              <div className="myday-avatar-headphones">♫</div>
            </div>
            <div className="myday-ask-copy">
              <h2>Ask CLARA</h2>
              <p>Let CLARA read your next activity or your daily schedule.</p>
              <button onClick={readNextActivity} disabled={speaking}>
                {speaking ? <LoaderCircle size={18} className="myday-spinning" /> : <Volume2 size={18} />}
                {speaking ? "Reading..." : "Read My Next Activity"}
              </button>
              {speaking && (
                <button
                  className="myday-stop-speaking"
                  onClick={() => {
                    window.speechSynthesis.cancel();
                    setSpeaking(false);
                  }}
                >
                  Stop voice
                </button>
              )}
            </div>
          </section>

          <section className="myday-side-card myday-inspiration-card">
            <header className="myday-side-title">
              <span className="myday-inspiration-sun"><Sun size={25} /></span>
              <h2>Today's Inspiration</h2>
            </header>
            <div className="myday-inspiration-content">
              <p>
                Every small step today is a step towards a brighter tomorrow.
                <Heart size={17} fill="currentColor" />
              </p>
              <span aria-hidden="true">🌷</span>
            </div>
          </section>
        </aside>
      </div>

      {notice && (
        <div className="myday-toast" role="status">
          <Check size={17} />
          {notice}
          <button aria-label="Dismiss notification" onClick={() => setNotice("")}>
            <X size={16} />
          </button>
        </div>
      )}

      {modalOpen && (
        <div
          className="myday-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModalOpen(false);
          }}
        >
          <section
            className="myday-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="myday-modal-title"
          >
            <header className="myday-modal-header">
              <div>
                <span className="myday-modal-eyebrow">
                  {editingId ? "MAKE A CHANGE" : "PLAN A LITTLE MOMENT"}
                </span>
                <h2 id="myday-modal-title">
                  {editingId ? "Edit Activity" : `Add ${form.type}`}
                </h2>
                <p>We'll keep it simple, one step at a time.</p>
              </div>
              <button
                className="myday-modal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Close form"
              >
                <X size={21} />
              </button>
            </header>

            <form onSubmit={saveActivity}>
              <label>
                Activity name *
                <input
                  autoFocus
                  required
                  maxLength={70}
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                  placeholder="e.g. Afternoon walk"
                />
              </label>

              <label>
                A short note
                <textarea
                  rows={3}
                  maxLength={180}
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                  placeholder="Add a gentle reminder or helpful detail"
                />
              </label>

              <div className="myday-form-row">
                <label>
                  Time *
                  <input
                    required
                    type="time"
                    value={form.time}
                    onChange={(event) =>
                      setForm({ ...form, time: event.target.value })
                    }
                  />
                </label>

                <label>
                  Category *
                  <select
                    value={form.type}
                    onChange={(event) =>
                      setForm({ ...form, type: event.target.value })
                    }
                  >
                    <option>Activity</option>
                    <option>Medicine</option>
                    <option>Meal</option>
                    <option>Exercise</option>
                  </select>
                </label>
              </div>

              {form.type === "Medicine" && (
                <p className="myday-medicine-note">
                  <Pill size={16} />
                  CLARA can read a reminder aloud when you press “Remind Me”.
                  This does not create a background alarm.
                </p>
              )}

              <div className="myday-modal-actions">
                <button
                  type="button"
                  className="myday-cancel-button"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="myday-save-button">
                  <Check size={18} />
                  {editingId ? "Save Changes" : "Add to My Day"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

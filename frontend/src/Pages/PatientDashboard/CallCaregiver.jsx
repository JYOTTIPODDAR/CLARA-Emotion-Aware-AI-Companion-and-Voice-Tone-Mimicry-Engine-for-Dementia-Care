
import { useEffect, useState } from "react";
import {
  Phone,
  PhoneCall,
  Heart,
  ShieldCheck,
  UserRound,
  Clock3,
  Pencil,
  Save,
  X,
  MessageCircle,
  Headphones,
  AlertCircle,
  CheckCircle2,
  Volume2,
  PhoneOutgoing,
} from "lucide-react";
import "./CallCaregiver.css";

const getPatientId = () =>
  localStorage.getItem("clara_patient_id") || "demo";

const getContactKey = () => `clara_caregiver_contact_${getPatientId()}`;

const defaultContact = {
  name: "",
  relationship: "Family member",
  phone: "",
  alternatePhone: "",
  notes: "My trusted caregiver",
};

const readContact = () => {
  try {
    const saved = localStorage.getItem(getContactKey());
    return saved ? { ...defaultContact, ...JSON.parse(saved) } : defaultContact;
  } catch {
    return defaultContact;
  }
};

export default function CallCaregiver() {
  const [contact, setContact] = useState(readContact);
  const [form, setForm] = useState(readContact);
  const [editing, setEditing] = useState(!readContact().name);
  const [notice, setNotice] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(getContactKey(), JSON.stringify(contact));
    } catch (error) {
      console.error("Unable to save caregiver contact:", error);
      setNotice("Unable to save contact. Please check browser storage.");
    }
  }, [contact]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(""), 3500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const saveContact = (event) => {
    event.preventDefault();

    const cleanPhone = form.phone.replace(/[^\d+]/g, "");
    if (cleanPhone.replace(/\D/g, "").length < 7) {
      setNotice("Please enter a valid caregiver phone number.");
      return;
    }

    const updated = {
      ...form,
      name: form.name.trim() || "My Caregiver",
      phone: cleanPhone,
      alternatePhone: form.alternatePhone.replace(/[^\d+]/g, ""),
    };

    setContact(updated);
    setForm(updated);
    setEditing(false);
    setNotice("Caregiver contact saved successfully.");
  };

  const startEditing = () => {
    setForm({ ...contact });
    setEditing(true);
  };

  const cancelEditing = () => {
    setForm({ ...contact });
    setEditing(false);
  };

  const speakHelp = () => {
    if (!("speechSynthesis" in window)) {
      setNotice("Voice support is not available in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const text = contact.name
      ? `You can contact your caregiver, ${contact.name}. ${
          contact.phone
            ? `Their phone number is ${contact.phone.split("").join(" ")}.`
            : ""
        } If you feel unsafe or need urgent help, ask someone nearby to assist you.`
      : "You can add your trusted caregiver's name and phone number here. If you need urgent help, ask someone nearby to assist you.";

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
  };

  const callHref = (phone) =>
    phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : undefined;

  return (
    <main className="cc-page">
      <section className="cc-hero">
        <div className="cc-hero-copy">
          <span className="cc-eyebrow">YOU ARE NOT ALONE</span>
          <h1>Call Your Caregiver</h1>
          <p>
            A familiar voice can make all the difference. Your trusted people
            are just a call away.
          </p>
          <button className="cc-hero-button" onClick={speakHelp}>
            <Volume2 size={18} />
            Let CLARA help
          </button>
        </div>
        <div className="cc-hero-art" aria-hidden="true">
          <div className="cc-hero-heart"><Heart size={24} fill="currentColor" /></div>
          <div className="cc-hero-people">👵🏻 💜 👩🏻</div>
          <div className="cc-hero-caption">Here for you, always</div>
        </div>
      </section>

      <section className="cc-safety-strip">
        <div className="cc-safety-icon">
          <ShieldCheck size={23} />
        </div>
        <div>
          <strong>Your comfort and safety matter.</strong>
          <p>Keep your caregiver's contact details up to date.</p>
        </div>
      </section>

      <div className="cc-content-grid">
        <section className="cc-card cc-primary-card">
          <header className="cc-card-heading">
            <div className="cc-heading-icon purple">
              <Heart size={21} />
            </div>
            <div>
              <h2>My Trusted Caregiver</h2>
              <p>Your first person to contact when you need support.</p>
            </div>
            {!editing && (
              <button
                className="cc-icon-button"
                aria-label="Edit caregiver details"
                onClick={startEditing}
              >
                <Pencil size={18} />
              </button>
            )}
          </header>

          {editing ? (
            <form className="cc-contact-form" onSubmit={saveContact}>
              <div className="cc-form-note">
                <UserRound size={18} />
                <span>
                  {contact.name
                    ? "Update your caregiver's details."
                    : "Add the person you trust to help you."}
                </span>
              </div>

              <label>
                Caregiver's name
                <input
                  value={form.name}
                  maxLength={70}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="e.g. Priya Sharma"
                />
              </label>

              <label>
                Relationship
                <select
                  value={form.relationship}
                  onChange={(event) =>
                    updateForm("relationship", event.target.value)
                  }
                >
                  <option>Family member</option>
                  <option>Son</option>
                  <option>Daughter</option>
                  <option>Spouse</option>
                  <option>Sibling</option>
                  <option>Friend</option>
                  <option>Professional caregiver</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                Phone number *
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={25}
                  value={form.phone}
                  onChange={(event) => updateForm("phone", event.target.value)}
                  placeholder="Enter caregiver's phone number"
                />
              </label>

              <label>
                Alternate phone (optional)
                <input
                  type="tel"
                  inputMode="tel"
                  maxLength={25}
                  value={form.alternatePhone}
                  onChange={(event) =>
                    updateForm("alternatePhone", event.target.value)
                  }
                  placeholder="Add a backup contact"
                />
              </label>

              <label>
                A helpful note (optional)
                <textarea
                  rows={2}
                  maxLength={150}
                  value={form.notes}
                  onChange={(event) => updateForm("notes", event.target.value)}
                  placeholder="e.g. Usually available in the afternoon"
                />
              </label>

              <div className="cc-form-actions">
                {contact.name && (
                  <button
                    type="button"
                    className="cc-cancel-button"
                    onClick={cancelEditing}
                  >
                    <X size={17} /> Cancel
                  </button>
                )}
                <button type="submit" className="cc-save-button">
                  <Save size={17} /> Save Contact
                </button>
              </div>
            </form>
          ) : (
            <div className="cc-contact-details">
              <div className="cc-contact-profile">
                <div className="cc-profile-avatar">
                  <UserRound size={36} />
                </div>
                <div className="cc-profile-info">
                  <h3>{contact.name}</h3>
                  <span>{contact.relationship}</span>
                  {contact.notes && <p>{contact.notes}</p>}
                </div>
              </div>

              <div className="cc-phone-detail">
                <span className="cc-phone-icon"><Phone size={18} /></span>
                <div>
                  <small>Phone number</small>
                  <strong>{contact.phone}</strong>
                </div>
              </div>

              {contact.alternatePhone && (
                <div className="cc-phone-detail">
                  <span className="cc-phone-icon alternate"><PhoneCall size={18} /></span>
                  <div>
                    <small>Alternate number</small>
                    <strong>{contact.alternatePhone}</strong>
                  </div>
                </div>
              )}

              <a className="cc-call-button" href={callHref(contact.phone)}>
                <PhoneCall size={21} />
                Call {contact.name}
                <PhoneOutgoing size={17} />
              </a>

              {contact.alternatePhone && (
                <a
                  className="cc-secondary-call"
                  href={callHref(contact.alternatePhone)}
                >
                  <Phone size={17} /> Call alternate contact
                </a>
              )}
              <p className="cc-call-hint">
                Your device may ask you to choose a calling app.
              </p>
            </div>
          )}
        </section>

        <aside className="cc-side-column">
          <section className="cc-card cc-help-card">
            <div className="cc-help-illustration">
              <div className="cc-help-circle"><Headphones size={35} /></div>
              <span>💜</span>
            </div>
            <h2>Need help right now?</h2>
            <p>
              Take a breath. You can call your caregiver or ask someone nearby
              to help you.
            </p>
            {contact.phone && !editing ? (
              <a className="cc-call-button" href={callHref(contact.phone)}>
                <PhoneCall size={19} /> Call Now
              </a>
            ) : (
              <button
                className="cc-call-button"
                onClick={() => {
                  setForm({ ...contact });
                  setEditing(true);
                  setNotice("Add a caregiver phone number to enable calling.");
                }}
              >
                <Phone size={19} /> Add a Contact First
              </button>
            )}
            <button
              className="cc-help-text-button"
              onClick={() => setShowHelp((current) => !current)}
            >
              <MessageCircle size={17} />
              {showHelp ? "Hide help steps" : "What should I do?"}
            </button>
            {showHelp && (
              <div className="cc-help-steps">
                <p><strong>1.</strong> Sit somewhere safe if you can.</p>
                <p><strong>2.</strong> Call your trusted caregiver.</p>
                <p><strong>3.</strong> If you are in immediate danger, ask someone nearby to contact local emergency services.</p>
              </div>
            )}
          </section>

          <section className="cc-card cc-alternate-card">
            <div className="cc-card-heading">
              <div className="cc-heading-icon peach">
                <Clock3 size={20} />
              </div>
              <div>
                <h2>Helpful Reminder</h2>
                <p>It's okay to ask for support.</p>
              </div>
            </div>
            <div className="cc-reminder-quote">
              <span>“</span>
              You don't have to do everything alone. Reaching out is a brave step.
              <Heart size={17} fill="currentColor" />
            </div>
          </section>

          <section className="cc-card cc-clara-card">
            <div className="cc-clara-bubble">🤖</div>
            <div className="cc-clara-copy">
              <h2>CLARA is here</h2>
              <p>I can read your contact details aloud whenever you need.</p>
              <button onClick={speakHelp}>
                <Volume2 size={17} /> Read contact details
              </button>
            </div>
          </section>
        </aside>
      </div>

      <section className="cc-bottom-note">
        <AlertCircle size={19} />
        <p>
          <strong>Important:</strong> CLARA's call buttons open your device's
          calling app. This page does not place calls automatically or replace
          professional medical or emergency services.
        </p>
      </section>

      {notice && (
        <div className="cc-toast" role="status">
          <CheckCircle2 size={18} />
          <span>{notice}</span>
          <button aria-label="Dismiss message" onClick={() => setNotice("")}>
            <X size={16} />
          </button>
        </div>
      )}
    </main>
  );
}

function filterCards(type) {
  const cards = document.querySelectorAll('.prog-card');

  cards.forEach((card) => {
    card.classList.toggle('visible', card.dataset.type === type);
  });
}

function setActiveTab(button) {
  document.querySelectorAll('.tab-btn').forEach((tab) => tab.classList.remove('active'));
  button.classList.add('active');
}

const DM_ACCOUNT_URL = 'https://www.facebook.com/CharlesZuutYT';
const DM_TEMPLATES = {
  'specialized-design': [
    'Hi Charles! I want to inquire about the Specialized Design custom program.',
    '',
    'My goal:',
    'Training days per week:',
    'Available equipment:',
    'Current training level:',
    '',
    'Thank you!'
  ].join('\n'),
  'personal-coaching': [
    'Hi Charles! I want to inquire about your Personal Coaching package.',
    '',
    'My goal:',
    'Training days per week:',
    'Preferred check-in schedule:',
    'Current training level:',
    '',
    'Thank you!'
  ].join('\n'),
  default: [
    'Hi Charles! I want to inquire about your programs.',
    '',
    'I am interested in:',
    'My goal:',
    'Training days per week:',
    '',
    'Thank you!'
  ].join('\n')
};

let toastTimer;

function showDMToast(message) {
  const toast = document.getElementById('dmToast');
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

async function copyToClipboard(text) {
  if (!navigator.clipboard) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function bindDMButtons() {
  const dmButtons = document.querySelectorAll('.dm-link');

  dmButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();

      const templateKey = button.dataset.template || 'default';
      const message = DM_TEMPLATES[templateKey] || DM_TEMPLATES.default;
      const popup = window.open(DM_ACCOUNT_URL, '_blank', 'noopener,noreferrer');

      const copied = await copyToClipboard(message);
      if (copied) {
        showDMToast('DM opened. Inquiry message copied - paste it in chat.');
      } else {
        showDMToast('DM opened. Copy the message from the prompt.');
        window.prompt('Copy this inquiry text and paste it in Messenger:', message);
      }

      if (!popup) {
        window.location.href = DM_ACCOUNT_URL;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const type = button.dataset.type;
      setActiveTab(button);
      filterCards(type);
    });
  });

  const defaultTab = document.querySelector('.tab-btn[data-type="gym"]');
  if (defaultTab) {
    setActiveTab(defaultTab);
    filterCards('gym');
  }

  bindDMButtons();
});

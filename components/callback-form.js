class CallbackForm extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        form {
          max-width: 500px;
          margin: 0 auto;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        input, textarea, select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          transition: all 0.3s ease;
        }
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
        }
        button {
          background-color: #f59e0b;
          color: white;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          width: 100%;
        }
        button:hover {
          background-color: #d97706;
        }
        .success-message {
          display: none;
          background-color: #10b981;
          color: white;
          padding: 1rem;
          border-radius: 0.375rem;
          margin-top: 1rem;
          text-align: center;
        }
      </style>
      <form id="callbackForm">
        <div class="form-group">
          <label for="name">Ваше имя</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="phone">Телефон</label>
          <input type="tel" id="phone" name="phone" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email">
        </div>
        <div class="form-group">
          <label for="message">Сообщение</label>
          <textarea id="message" name="message" rows="3"></textarea>
        </div>
        <button type="submit">Отправить заявку</button>
        <div class="success-message" id="successMessage">
          Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.
        </div>
      </form>
    `;

    const form = this.shadowRoot.getElementById('callbackForm');
    form.addEventListener('submit', this.handleSubmit.bind(this));
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const successMessage = this.shadowRoot.getElementById('successMessage');

    // Create submission object
    const submission = {
      id: Date.now(),
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      message: formData.get('message'),
      date: new Date().toISOString(),
      status: 'new'
    };
    // Save to localStorage
    const savedSubmissions = localStorage.getItem('formSubmissions');
    const submissions = savedSubmissions ? JSON.parse(savedSubmissions) : [];
    submissions.unshift(submission); // Add new submission to beginning
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));

    // Send email
    const emailBody = `Новая заявка с сайта:\n\nИмя: ${submission.name}\nТелефон: ${submission.phone}\nEmail: ${submission.email || 'не указан'}\nСообщение: ${submission.message || 'не указано'}`;
    window.location.href = `mailto:050174050@mail.ru?subject=Новая заявка с сайта&body=${encodeURIComponent(emailBody)}`;

    form.reset();
    successMessage.style.display = 'block';
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);
}
}

customElements.define('callback-form', CallbackForm);
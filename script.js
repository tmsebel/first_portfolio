document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formMessage = document.getElementById('form-message');
    const cellInput = document.getElementById('cell').value;

    // Basic validation for cell number (numeric and reasonable length)
    const cellRegex = /^\d{10,15}$/;
    if (!cellRegex.test(cellInput)) {
        formMessage.textContent = 'Please enter a valid cell number (10-15 digits).';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
        return;
    }

    // Prepare form data
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
            formMessage.classList.remove('error');
            formMessage.classList.add('success');
            form.reset(); // Clear the form
        } else {
            throw new Error('Failed to send message.');
        }
    } catch (error) {
        formMessage.textContent = 'Error sending message. Please try again later.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
    }
});
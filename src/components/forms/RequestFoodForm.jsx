export default function RequestFoodForm() {
  const handleRequestSubmit = () => {
    console.log("I am requested");
  };
  return (
    <form onSubmit={handleRequestSubmit} className="fieldset">
      <label>Your Name</label>
      <input type="text" placeholder="Your name" className="input" />
      <label>Contact No</label>
      <input type="text" placeholder="Contact No" className="input" />
      <label>Location</label>
      <input type="text" placeholder="Location" className="input" />
      <label>Why do you need this?</label>
      <textarea className="textarea"></textarea>
      <button>Request Now</button>
    </form>
  );
}

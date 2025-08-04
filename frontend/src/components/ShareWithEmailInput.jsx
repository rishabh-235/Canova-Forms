function ShareWithEmailInput({ email, index, setSharedEmailsWithViewAccess }) {
  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        id="manage-share"
        placeholder="Enter email to share"
        value={email?.email || ""}
        onChange={(e) => {
          setSharedEmailsWithViewAccess((prev) => {
            const updatedEmails = [...prev];
            updatedEmails[index] = {
              ...updatedEmails[index],
              email: e.target.value,
            };
            return updatedEmails;
          });
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "18rem",
          top: "0.5rem",
          color: "#69B5F8",
        }}
      >
        {email?.type || "view"}
      </div>
    </div>
  );
}
export default ShareWithEmailInput;

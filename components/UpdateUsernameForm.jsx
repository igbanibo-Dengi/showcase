// upadte Form React component
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

const UpdateUsernameForm = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpdateUsername = async () => {
    console.log("newUsername before fetch:", username);

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/username", {
        method: "POST",
        body: JSON.stringify(username),
      });

      if (!res.ok) {
        throw new Error("Failed to update username");
      }

      setSuccess(true);
      console.log("Username updated successfully!");
    } catch (error) {
      setError(error.message);
      console.error("Error updating username:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Optionally, you can handle success effects or cleanup here
  }, [success]);

  return (
    <div>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button onClick={handleUpdateUsername} disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Username"}
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>Username updated successfully!</p>
      )}
    </div>
  );
};

export default UpdateUsernameForm;

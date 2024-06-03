"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

const TeacherDashboard = () => {
  const { data: session, status } = useSession();
  const [lessons, setLessons] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get(`/api/user?id=${session.user.id}`)
        .then((res) => console.log(res.data));
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to view this page.</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.username}</h1>
      <h2>My Lessons</h2>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>{lesson.title}</li>
        ))}
      </ul>
      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;

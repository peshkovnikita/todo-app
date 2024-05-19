import React from 'react';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from "./components/Footer";

export default function App() {
  const taskData = [
      { itemState: 'completed', description: 'Completed task', creationTime: 'created 17 seconds ago', id: 0 },
      { itemState: 'editing',   description: 'Editing task',   creationTime: 'created 5 minutes ago', id: 1 },
      { itemState: null,        description: 'Active task',    creationTime: 'created 5 minutes ago', id: 2 },
  ];

  return (
      <section className='todoapp'>
        <NewTaskForm />
          <section className='main'>
              <TaskList data={ taskData }/>
              <Footer />
          </section>
      </section>
  );
}

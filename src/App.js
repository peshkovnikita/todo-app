import React from 'react';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from "./components/Footer";

function App() {
  const taskData = [
      { id: 0, itemState: 'completed', description: 'Completed task', creationTime: 'created 17 seconds ago' },
      { id: 1, itemState: 'editing',   description: 'Editing task',   creationTime: 'created 5 minutes ago' },
      { id: 2, itemState: null,        description: 'Active task',    creationTime: 'created 5 minutes ago' },
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

export default App;

import React from "react";

function MainPage() {
  return (
    <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6">Hello from page</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <p className="text-gray-700 dark:text-gray-300">
          some content goes here
        </p>
      </div>
    </main>
  );
}

export default MainPage;

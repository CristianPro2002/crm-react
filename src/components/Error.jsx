function Error({ children }) {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5">
      <p className="font-bold">Error</p>
      <p>{children}</p>
    </div>
  );
}

export default Error;

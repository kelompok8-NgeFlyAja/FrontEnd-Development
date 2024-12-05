const CheckoutInput = ({ label, placeholder, name, type }) => {
  return (
    <div className="flex flex-col gap-1 px-4 py-2">
      <label htmlFor={name} className="text-purple-900 font-bold">
        {label}
      </label>
      <input
        className="bg-slate-100 py-2 px-3 rounded-md border border-slate-300"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};
export default CheckoutInput;

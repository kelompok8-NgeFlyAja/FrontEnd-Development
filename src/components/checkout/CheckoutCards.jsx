const CheckoutCards = ({ children }) => {
  return (
    <div
      className={`rounded border border-gray-400 px-4 py-5 md:w-[518px] h-fit`}
    >
      {children}
    </div>
  );
};

export default CheckoutCards;

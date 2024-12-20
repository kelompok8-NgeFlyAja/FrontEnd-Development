export default function Banner() {
  return (
    <div className="relative">
      <div
        className="absolute left-0 right-0 w-full h-[150px] hidden md:block"
        style={{
          background: "linear-gradient(to right, #7126B580, #E2D4F0)",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      ></div>

      {/* Centered Content */}
      <div className="flex justify-center items-center relative">
        <div className="relative mt-6 w-[90%] h-[100%] sm:w-[100%] sm:h-[232px] md:mt-15 md:w-[1213px] md:h-[232px]">
          <img
            src="banner.png"
            alt="Background"
            className="w-full h-full object-cover"
            style={{ borderRadius: "0px 0px 0px 0px" }}
          />
        </div>
      </div>
    </div>
  );
}

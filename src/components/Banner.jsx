export default function Banner() {
  return (
    <div className="relative">

      <div
        className="absolute left-0 right-0 w-full h-[150px]"
        style={{
          background: "linear-gradient(to right, #7126B580, #E2D4F0)",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      ></div>

      {/* Centered Content */}
      <div className="flex justify-center items-center relative">
        <div className="relative mt-6 md:mt-15">
          <img
            src="banner.png"
            alt="Background"
            className="w-full h-40 md:w-[1213px] md:h-[232px] md:top-[116px] md:left-[128px] border-r-20 rounded-r-20"
            style={{ borderRadius: "0px 20px 20px 0px" }}
          />
        </div>
      </div>
    </div>
  );
}

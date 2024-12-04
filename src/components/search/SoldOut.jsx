function SoldOut() {
  return (
    <div className="content max-w-full w-full mx-auto relative flex flex-col items-center py-7">
      <img src="soldout.png" alt="soldout" className="w-1/3 mb-4" />

      <div className="text-center">
        <p className="text-lg font-bold mb-1">Maaf, tiket terjual habis!</p>
        <p className="text-lg font-bold text-[#7126B5] pb-12">
          Coba cari perjalanan lainnya!
        </p>
      </div>
    </div>
  );
}

export default SoldOut;

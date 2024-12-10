import { Card, CardContent, CardHeader } from "@/components/ui/card";

function FeauteredFlightCard() {
  const destinations = [
    {
      id: 1,
      image: "bangkok.png",
      title: "Jakarta → Bangkok",
      airline: "AirAsia",
      date: "20 - 30 Maret 2023",
      price: "IDR 950.000",
      label: "Limited!",
    },
    {
      id: 2,
      image: "bangkok.png",
      title: "Jakarta → Bangkok",
      airline: "AirAsia",
      date: "20 - 30 Maret 2023",
      price: "IDR 950.000",
      label: "Limited!",
    },
    {
      id: 3,
      image: "sydney.png",
      title: "Jakarta → Sydney",
      airline: "AirAsia",
      date: "5 - 25 Maret 2023",
      price: "IDR 3.650.000",
      label: "50% OFF",
    },
    {
      id: 4,
      image: "sydney.png",
      title: "Jakarta → Sydney",
      airline: "AirAsia",
      date: "5 - 25 Maret 2023",
      price: "IDR 3.650.000",
      label: "50% OFF",
    },
    {
      id: 5,
      image: "bangkok.png",
      title: "Jakarta → Bangkok",
      airline: "AirAsia",
      date: "20 - 30 Maret 2023",
      price: "IDR 950.000",
      label: "Limited!",
    },
  ];

  return (
    <div className="content max-w-[1098px] w-full mx-auto relative pt-6 bg-none rounded-lg mt-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {destinations.map((dest) => (
          <Card
            key={dest.id}
            className="max-w-[200px] max-h-[212px] shadow-md rounded-lg relative transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            <span className="absolute top-0 right-0 bg-[#A06ECE] text-white text-[8px] font-bold px-2 py-1 rounded-l-lg rounded-tr-lg z-10">
              {dest.label}
            </span>

            <CardHeader className="p-0">
              <div className="w-full h-[108px]  overflow-hidden rounded-t-lg">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardHeader>

            <CardContent className="px-3 py-2">
              <p className="text-[#3C3C3C] font-medium text-[10px] leading-[14px]">
                {dest.title}
              </p>
              <p className="text-[#7126B5] text-[10px] font-bold leading-[14px] mt-1">
                {dest.airline}
              </p>
              <p className="text-[#3C3C3C] text-[9px] mt-1">{dest.date}</p>
              <p className="text-[#3C3C3C] text-[8px]">
                Mulai dari{" "}
                <span className="text-[#FF0000] font-bold text-[10px] leading-[14px]">
                  {dest.price}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FeauteredFlightCard;

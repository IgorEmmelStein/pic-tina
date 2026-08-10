// Format the date to a string
function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(undefined, options);
}
// Capitalize the first letter
function capitalize(str: string): string {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const randomImage = (imagesArray: { src: string; alt: string }[]) =>
  imagesArray[Math.floor(Math.random() * imagesArray.length)];

export const randomHeaderImages = () => {
  const headerImages = [
    {
      src: "/src/assets/stock/stock_Plane-ground-road_oleksandr-brovko-52duyrkyEls-unsplash.jpg",
      alt: "Airplane on ground near road by Oleksandr Brovko",
    },
    {
      src: "/src/assets/stock/stock_Plane-pilot-ground-standing_maria-teneva-m2MIMI7VS4Y-unsplash.jpg",
      alt: "Pilot standing near airplane by Maria Teneva",
    },
    {
      src: "/src/assets/stock/stock_Plane-pilot-helice_luciano-faiolo-W68nUftntf4-unsplash.jpg",
      alt: "Pilot near aircraft propeller by Luciano Faiolo",
    },
    {
      src: "/src/assets/stock/stock_student-cockpit_truman-talbot-uj4V299Eo5c-unsplash.jpg",
      alt: "Student pilot in cockpit by Truman Talbot",
    },
    {
      src: "/src/assets/eliezer-fernandes-y7E8qfllcY0-unsplash.jpg",
      alt: "Aircraft exterior by Eliezer Fernandes",
    },
    {
      src: "/src/assets/brendan-sapp-sRSDoc3SCyU-unsplash.jpg",
      alt: "Airplane at sunset by Brendan Sapp",
    },
  ];

  return randomImage(headerImages);
};

export { formatDate, capitalize };

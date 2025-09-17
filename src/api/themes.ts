export const addons = [
  {
    id: 0,
    title: "ჩვენ სერვერზე",
    title_eng: "On Our Server",
  },
  {
    id: 1,
    title: "ქართულად",
    title_eng: "In Georgian",
  },
  {
    id: 2,
    title: "ინგლისურად",
    title_eng: "In English",
  },
  {
    id: 3,
    title: "HD",
    title_eng: "HD",
  },
  {
    id: 4,
    title: "2K",
    title_eng: "2K",
  },
  {
    id: 5,
    title: "4K",
    title_eng: "4K",
  },
  {
    id: 6,
    title: "16+",
    title_eng: "16+",
  },
  {
    id: 7,
    title: "18+",
    title_eng: "18+",
  },
  {
    id: 8,
    title: "ანონსი",
    title_eng: "Announcement",
  },
  {
    id: 9,
    title: "თრეილერი",
    title_eng: "Trailer",
  },
  {
    id: 10,
    title: "სუბტიტრებით",
    title_eng: "With Subtitles",
  },
  {
    id: 11,
    title: "ნახლდება",
    title_eng: "Updating",
  },
];
export const types = [
  {
    id: 0,
    title: "ფილმი",
    title_eng: "Movie",
    color: "#D10345",
    bgcolor: "rgba(209, 3, 68, 0.1)",
  },
  {
    id: 1,
    title: "სერიალი",
    title_eng: "TV Show",
    color: "#1699ea",
    bgcolor: "rgba(0, 121, 235, 0.1)",
  },
  {
    id: 2,
    title: "ანიმაცია",
    title_eng: "Animation",
    color: "#1ad15a",
    bgcolor: "rgba(26, 209, 90, 0.1)",
  },
  {
    id: 3,
    title: "ანიმე",
    title_eng: "Anime",
    color: "#db00eb",
    bgcolor: "rgba(219, 0, 235, 0.1)",
  },
];
export type TGenre = {
  title: string;
  title_eng: string;
  color: string;
  bgcolor: string;
  image: string;
};
export const genres = [
  {
    title: "ანიმაციური",
    title_eng: "Animated",
    color: "#67c800",
    bgcolor: "rgba(103, 200, 0, 0.7718)",
    image: "https://cdn.croconet.cam/genres/uploads/29/twyDMhn_sm2.webp",
  },
  {
    title: "ბიოგრაფიული",
    title_eng: "Biographical",
    color: "#EBAC00",
    bgcolor: "rgba(235, 172, 0, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/512/t5BmLjc_sm2.webp",
  },
  {
    title: "დრამა",
    title_eng: "Drama",
    color: "#D10345",
    bgcolor: "rgba(209, 3, 68, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/226/tWxkbyJ_sm2.webp",
  },
  {
    title: "დოკუმენტური",
    title_eng: "Documentary",
    color: "#EB005E",
    bgcolor: "rgba(235, 0, 94, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/422/tbFUduR_sm2.webp",
  },
  {
    title: "დეტექტივი",
    title_eng: "Detective",
    color: "#00AAD9",
    bgcolor: "rgba(0, 170, 217, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/822/trB40p1_sm2.webp",
  },
  // {
  //   title: "დორამები",
  //   color: "#ae00d9",
  //   bgcolor: "rgba(137, 0, 217, 0.1)",
  //   image: "image_url",
  // },
  {
    title: "ეროტიკული",
    title_eng: "Erotic",
    color: "#c80000",
    bgcolor: "rgba(200, 0, 0, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/701/tRovczl_sm2.webp",
  },
  {
    title: "ვესტერნი",
    title_eng: "Western",
    color: "#eb8100",
    bgcolor: "rgba(235, 129, 0, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/781/tTgUo75_sm2.webp",
  },
  {
    title: "თრილერი",
    title_eng: "Thriller",
    color: "#EB2F00",
    bgcolor: "rgba(235, 47, 0, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/767/tgCtYap_sm2.webp",
  },
  {
    title: "თურქული სერიალები",
    title_eng: "Turkish Series",
    color: "#eb0000",
    bgcolor: "rgba(235, 47, 0, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/255/tac438O_sm2.webp",
  },
  {
    title: "თურქული ფილმები",
    title_eng: "Turkish Movies",
    color: "#eb2f00",
    bgcolor: "rgba(235, 74, 0, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/555/tCITLji_sm2.webp",
  },
  {
    title: "ისტორიული",
    title_eng: "Historical",
    color: "#F4C60B",
    bgcolor: "rgba(244, 197, 11, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/55/teTxKFL_sm2.webp",
  },
  {
    title: "ინტელექტუალური",
    title_eng: "Intellectual",
    color: "#8684ff",
    bgcolor: "rgba(134, 132, 255, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/829/tgnnn3H_sm2.webp",
  },
  {
    title: "კომედია",
    title_eng: "Comedy",
    color: "#ebb400",
    bgcolor: "rgba(235, 180, 0, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/758/t73ulc1_sm2.webp",
  },
  {
    title: "კრიმინალური",
    title_eng: "Crime",
    color: "#b5b5b5",
    bgcolor: "rgba(181, 181, 181, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/674/t3jjWzJ_sm2.webp",
  },
  {
    title: "მაგიური",
    title_eng: "Magic",
    color: "#8d00eb",
    bgcolor: "rgba(141, 0, 235, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/632/thHXF1v_sm2.webp",
  },
  {
    title: "მისტიკა",
    title_eng: "Mystique",
    color: "#DF00EB",
    bgcolor: "rgba(223, 0, 235, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/46/tLu4ums_sm2.webp",
  },
  {
    title: "მისტიური",
    title_eng: "Mystery",
    color: "#7900eb",
    bgcolor: "rgba(121, 0, 235, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/609/tCyqape_sm2.webp",
  },
  {
    title: "მძაფრ-სიუჟეტიანი",
    title_eng: "Action",
    color: "#EB7D00",
    bgcolor: "rgba(235, 125, 0, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/674/t3jjWzJ_sm2.webp",
  },
  {
    title: "მელოდრამა",
    title_eng: "Melodrama",
    color: "#EB0071",
    bgcolor: "rgba(235, 0, 114, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/28/tSO124n_sm2.webp",
  },
  {
    title: "მიუზიკლი",
    title_eng: "Musical",
    color: "#DD0051",
    bgcolor: "rgba(221, 0, 81, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/121/tpSfM2F_sm2.webp",
  },
  {
    title: "მუსიკალური",
    title_eng: "Musical",
    color: "#dd00ad",
    bgcolor: "rgba(221, 0, 203, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/181/ty9DUmp_sm2.webp",
  },
  {
    title: "მოკლემეტრაჟიანი",
    title_eng: "Short Film",
    color: "#EB6E00",
    bgcolor: "rgba(235, 110, 0, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/570/tLWliwQ_sm2.webp",
  },
  {
    title: "რომანტიკა",
    title_eng: "Romance",
    color: "#eb00b4",
    bgcolor: "rgba(235, 0, 180, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/673/tc8EJtf_sm2.webp",
  },
  {
    title: "საახალწლო",
    title_eng: "New Year",
    color: "#00d71d",
    bgcolor: "rgba(0, 215, 29, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/12/tNb8LSI_sm2.webp",
  },
  {
    title: "სამეცნიერო",
    title_eng: "Science Fiction",
    color: "#00a5d7",
    bgcolor: "rgba(0, 165, 215, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/764/tH0C2Kf_sm2.webp",
  },
  {
    title: "საბავშვო",
    title_eng: "Children",
    color: "#67c800",
    bgcolor: "rgba(103, 200, 0, 0.7718)",
    image: "https://cdn.croconet.cam/genres/uploads/16/t9Z6SqD_sm2.webp",
  },
  {
    title: "სათავგადასავლო",
    title_eng: "Adventure",
    color: "#00C317",
    bgcolor: "rgba(0, 195, 23, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/813/tR7OySJ_sm2.webp",
  },
  {
    title: "საბრძოლო ხელოვნება",
    title_eng: "Martial Arts",
    color: "#00c4e3",
    bgcolor: "rgba(0, 197, 227, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/367/tPgnPjF_sm2.webp",
  },
  {
    title: "საშინელებათა",
    title_eng: "Horror",
    color: "#DB0004",
    bgcolor: "rgba(219, 0, 4, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/234/tRiMtmT_sm2.webp",
  },
  {
    title: "საომარი",
    title_eng: "War",
    color: "#00893E",
    bgcolor: "rgba(0, 137, 62, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/251/tMWh1XR_sm2.webp",
  },
  {
    title: "საოჯახო",
    title_eng: "Family",
    color: "#0091EB",
    bgcolor: "rgba(0, 145, 235, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/227/tQXhDuK_sm2.webp",
  },
  {
    title: "სპორტული",
    title_eng: "Sports",
    color: "#FF9215",
    bgcolor: "rgba(255, 146, 21, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/819/tM2zSaR_sm2.webp",
  },
  {
    title: "ფენტეზი",
    title_eng: "Fantasy",
    color: "#a100eb",
    bgcolor: "rgba(149, 0, 235, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/699/tns9uFW_sm2.webp",
  },
  {
    title: "ფანტასტიკა",
    title_eng: "Science Fiction",
    color: "#C400EB",
    bgcolor: "rgba(196, 0, 235, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/683/tEQJhSH_sm2.webp",
  },
  {
    title: "ქართული",
    title_eng: "Georgian",
    color: "#d99400",
    bgcolor: "rgba(217, 148, 0, 0.1)",
    image: "https://cdn.croconet.cam/genres/uploads/672/ti9RRIz_sm2.webp",
  },
];
export const languages = [
  {
    title: "ქართულად",
    title_eng: "Georgian",
  },
  {
    title: "ინგლისურად",
    title_eng: "English",
  },
  {
    title: "რუსულად",
    title_eng: "Russian",
  },
];
export const years = [
  {
    title: "2025",
  },
  {
    title: "2024",
  },
  {
    title: "2023",
  },
  {
    title: "2022",
  },
  {
    title: "2021",
  },
  {
    title: "2020",
  },
  {
    title: "2019",
  },
  {
    title: "2018",
  },
  {
    title: "2017",
  },
  {
    title: "2016",
  },
];
export const imdbs = [
  {
    title: "9.0+",
  },
  {
    title: "8.0+",
  },
  {
    title: "7.0+",
  },
  {
    title: "6.0+",
  },
  {
    title: "5.0+",
  },
  {
    title: "4.0+",
  },
  {
    title: "3.0+",
  },
  {
    title: "2.0+",
  },
  {
    title: "1.0+",
  },
];

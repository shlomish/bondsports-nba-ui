import PlayersList from "./PlayersList";

interface FavoritePlayersProps {}

const FavoritePlayers = (props: FavoritePlayersProps) => {
  return (
    <PlayersList
      players={[
        {
          id: 14,
          first_name: "Ike",
          height_feet: null,
          height_inches: null,
          last_name: "Anigbogu",
          position: "C",
          team: {
            id: 12,
            abbreviation: "IND",
            city: "Indiana",
            conference: "East",
            division: "Central",
            full_name: " ",
            name: "Pacers",
          },
          weight_pounds: null,
        },
        {
          id: 25,
          first_name: "Ron",
          height_feet: null,
          height_inches: null,
          last_name: "Baker",
          position: "G",
          team: {
            id: 20,
            abbreviation: "NYK",
            city: "New York",
            conference: "East",
            division: "Atlantic",
            full_name: "New York Knicks",
            name: "Knicks",
          },
          weight_pounds: null,
        },
        {
          id: 47,
          first_name: "Jabari",
          height_feet: null,
          height_inches: null,
          last_name: "Bird",
          position: "G",
          team: {
            id: 2,
            abbreviation: "BOS",
            city: "Boston",
            conference: "East",
            division: "Atlantic",
            full_name: "Boston Celtics",
            name: "Celtics",
          },
          weight_pounds: null,
        },
      ]}
    />
  );
};

export default FavoritePlayers;

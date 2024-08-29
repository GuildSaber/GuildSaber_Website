import ListBox from "@/components/ListBox/ListBox";
import { Guild } from "@/types/api/models/guild";

type PlayerGuildsListBoxProps = {
  guilds: Guild[];
  guildID: number;
  onChange: (guildID: number) => void;
};

const PlayerGuildsListBox = ({
  guilds,
  guildID,
  onChange,
}: PlayerGuildsListBoxProps) => {
  return (
    <div className="w-auto">
      <ListBox
        options={guilds
          .filter((guild) => guild.simplePoints?.length !== 0)
          .reduce(
            (acc: { value: number; label: string; image: string }[], guild) =>
              (acc = [
                ...acc,
                {
                  value: guild.id,
                  label: guild.name,
                  image: `https://cdn.guildsaber.com/Guild/${guild.id}/Logo.jpg`,
                },
              ]),
            [],
          )}
        value={guildID}
        //value={guildID}
        onChange={(option) => onChange(option.value)}
      />
    </div>
  );
};

export default PlayerGuildsListBox;

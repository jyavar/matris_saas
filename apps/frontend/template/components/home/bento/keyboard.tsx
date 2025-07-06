import { Keyboard,Keycap, KeyRow } from "@/components/ui/animated-keyboard";

const KEY_HEIGHT = "36px";

const TOP_ROW_KEYS = [
  { char: "~", secondaryChar: "`" },
  { char: "2", secondaryChar: "@" },
  { char: "3", secondaryChar: "#" },
  { char: "4", secondaryChar: "$" },
  { char: "5", secondaryChar: "%" },
  { char: "6", secondaryChar: "^" },
  { char: "7", secondaryChar: "&" },
  { char: "8", secondaryChar: "*" },
  { char: "9", secondaryChar: "(" },
  { char: "0", secondaryChar: ")" },
  { char: "-", secondaryChar: "_" },
  { char: "=", secondaryChar: "+" },
];

const SECOND_ROW_KEYS = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];

const THIRD_ROW_KEYS = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];

const FOURTH_ROW_KEYS = ["Z", "X", "C", "V", "B", "N", "M"];

const SPECIAL_KEYS = {
  THIRD_ROW_END: [
    { char: ";", secondaryChar: ":" },
    { char: "'", secondaryChar: '"' },
  ],
  FOURTH_ROW_END: [
    { char: ",", secondaryChar: "<" },
    { char: ".", secondaryChar: ">" },
    { char: "/", secondaryChar: "?" },
  ],
};

function TopRow() {
  return (
    <KeyRow>
      {TOP_ROW_KEYS.map((key) => (
        <Keycap
          key={key.char}
          char={key.char}
          secondaryChar={key.secondaryChar}
          variant="double"
          height={KEY_HEIGHT}
          className="rounded-[6px]"
        />
      ))}
    </KeyRow>
  );
}

function SecondRow() {
  return (
    <KeyRow>
      <Keycap
        char="Tab"
        variant="tab"
        height={KEY_HEIGHT}
        className="rounded-[6px]"
      />
      {SECOND_ROW_KEYS.map((char) => (
        <Keycap
          key={char}
          char={char}
          height={KEY_HEIGHT}
          className="rounded-[6px]"
        />
      ))}
    </KeyRow>
  );
}

function ThirdRow() {
  return (
    <KeyRow>
      <Keycap
        char="Caps"
        variant="caps"
        height={KEY_HEIGHT}
        className="rounded-[6px]"
      />
      {THIRD_ROW_KEYS.map((char) => (
        <Keycap
          key={char}
          char={char}
          height={KEY_HEIGHT}
          className="rounded-[6px]"
        />
      ))}
      {SPECIAL_KEYS.THIRD_ROW_END.map((key) => (
        <Keycap
          key={key.char}
          char={key.char}
          secondaryChar={key.secondaryChar}
          variant="double"
          height={KEY_HEIGHT}
          className="rounded-[6px]"
        />
      ))}
    </KeyRow>
  );
}

function FourthRow() {
  return (
    <KeyRow>
      <Keycap
        char="Shift"
        variant="shift"
        height={KEY_HEIGHT}
        className="rounded-[6px]"
      />
      {FOURTH_ROW_KEYS.map((char) => (
        <Keycap
          key={char}
          char={char}
          height={KEY_HEIGHT}
          className="rounded-[6px]"
        />
      ))}
      {SPECIAL_KEYS.FOURTH_ROW_END.map((key) => (
        <Keycap
          key={key.char}
          char={key.char}
          secondaryChar={key.secondaryChar}
          variant="double"
          height={KEY_HEIGHT}
          className="rounded-[6px]"
        />
      ))}
    </KeyRow>
  );
}

function BottomRow() {
  return (
    <KeyRow>
      <Keycap
        char="alt"
        variant="command"
        height={KEY_HEIGHT}
        className="rounded-[6px]"
      />
      <Keycap
        char="⌘"
        variant="command"
        height={KEY_HEIGHT}
        className="rounded-[6px]"
      />
      <Keycap
        char=""
        variant="space"
        height={KEY_HEIGHT}
        className="rounded-[6px]"
      />
      <Keycap
        char="⎇"
        variant="command"
        height={KEY_HEIGHT}
        className="rounded-[6px]"
      />
    </KeyRow>
  );
}

export default function KeyboardCell() {
  return (
    <div>
      <Keyboard className="bg-sidebar border border-[#7876c5]/20 accent-shadow">
        <TopRow />
        <SecondRow />
        <ThirdRow />
        <FourthRow />
        <BottomRow />
      </Keyboard>
    </div>
  );
}

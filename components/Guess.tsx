interface Props {
    isGuessed: boolean;
    guess: string;
    word: string;
}

export default function Guess({ isGuessed, guess, word }: Props) {
    return (
        <div className="grid grid-cols-5 gap-2 md:gap-2 mb-2">
            {new Array(5).fill(0).map((_, i) => {
                const status = !isGuessed
                    ? 'unknown'
                    : guess[i] === word[i]
                    ? 'correct'
                    : word.includes(guess[i])
                    ? 'present'
                    : 'absent';

                return (
                    <div key={i} className={`h-10 w-10 md:h-16 md:w-16 font-bold uppercase flex items-center justify-center tile ${status}`}>
                        {guess[i]}
                    </div>
                );
            })}
        </div>
    );
}
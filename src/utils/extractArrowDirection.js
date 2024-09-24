function extractArrowDirection(str) {
    const words = str.split(' ');

    const className = words[words.length - 1];

    const parts = className.split('-');
    const result =
        parts
            .slice(0, 1)
            .map((part) => part[0].toUpperCase() + part.slice(1))
            .join('') +
        parts
            .slice(1)
            .map((part) => part[0].toUpperCase() + part.slice(1))
            .join('');

    return result;
}

extractArrowDirection('button arrow-up');

match command.split() if command else ['default']:
    ... # Other cases
    case ["north"] | ["go", "north"]:
        ... # handle case
    case ["get", obj] | ["pick", "up", *other] | ["pick", obj, "up"]:
        ... # handle case

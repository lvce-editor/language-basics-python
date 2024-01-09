match points:
    case []:
        print("No points in the list.")
    case [Point(0, 0)]:
        print("The origin is the only point in the list.")
    case [Point(x, y)]:
        print(f"A single point is in the list.")
    case [Point(0, y1), Point(0, y2)]:
        print(f"Two points on the Y axis are in the list.")
    case _:
        print("Something else is found in the list.")

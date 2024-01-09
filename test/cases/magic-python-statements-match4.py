match point:
    case Point(x, y) if x == y:
        print(f"The point is located on the diagonal Y=X.")
    case Point(x, y):
        print(f"Point is not on the diagonal.")

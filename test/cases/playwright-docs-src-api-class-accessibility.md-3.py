def find_focused_node(node):
    if node.get("focused"):
        return node
    for child in (node.get("children") or []):
        found_node = find_focused_node(child)
        if found_node:
            return found_node
    return None

snapshot = page.accessibility.snapshot()
node = find_focused_node(snapshot)
if node:
    print(node["name"])

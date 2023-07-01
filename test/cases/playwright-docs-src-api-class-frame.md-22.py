frame_element = await frame.frame_element()
content_frame = await frame_element.content_frame()
assert frame == content_frame

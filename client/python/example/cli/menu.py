class MenuItem:
  key = ''
  text = ''
  callback = None
  exitMenu = False

  def __init__(self, key, text, callback, exitMenu):
    self.key = key
    self.text = text
    self.callback = callback
    self.exitMenu = exitMenu

class Menu:
  title = ''
  menuItems = []

  def __init__(self, title, menuItems):
    self.title = title
    self.menuItems = menuItems

  def show(self):
    while True:
      print(f'\n===== {self.title} =====\n')

      for item in self.menuItems:
        print(f'({item.key}) {item.text}')

      selected = input('\n>>>>> Select a menu: ')
      selected.strip().lower()

      exitMenu = False

      for item in self.menuItems:
        if item.key == selected:
          if item.callback:
            item.callback()

          if item.exitMenu:
            exitMenu = True
            break
      
      if exitMenu:
        break



# What is Cellular Automata?

Cellular Automata (CA) consists of a grid of squares called _cells_, each of which contain a finite number of _states_. In binary-state cellular automata, a cell has two states, "dead" or "alive". After each generation, if a cell contains a number of alive neighbor cells as specified by the _survival rule_, it will stay alive in the next generation. Otherwise, it will die (or in the case for multi-state CA, lose one state). For example, the famous Conway's Game of Life features a survival rule of "2,3" (an alive cell stays alive if it contains 2 or 3 neighbours, otherwise it dies), and a birth rule of "2" (a cell is born if it contains 2 neighbors), Similarly, if a blank (dead) cell on the grid contains a number of alive neighbor cells as specified by the _birth rule_, an alive cell will be born in that location. A cell is usually defined to be a neighbor to another cell if it is one of eight cells surrounding it (in a 3x3 square) - this is called a Moore neighborhood. Alternatively, a von Neumann neighborhood defines a cell to be a neighbor if it is one of four cells directly adjacent to it (top, bottom, left, right).

There is incredible complexity that arises as a result of these birth, survival, and state rules that define cellular automata. [Conway's Game of Life contains a variety of "patterns", including _"still lifes"_, _"oscillators"_, and _"spaceships"_ that one would not expect from its simple rules](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns) (I suggest that you try to intentionally build some of these patterns yourself as not many of them can be encountered by randomly populating the system). Conway's Game of Life has been proved to be Turing Complete, meaning that any computation that can be done by a traditional computer is possible to be done in the Conway's Game of Life given a specific initial configuration. In addition, Conway's Game of Life is just one of many rules that is possible in 2D Cellular Automata. Use the Rule Presets dropdown to see some - my personal favorite is "Star Wars".

# Controls

*   **Click** on the grid to place a new cell.
*   Use the **Rule Preset** dropdown to specify an interesting rule from a sample of Mirek Wójtowicz's rules collection ([[Binary-state]](http://psoup.math.wisc.edu/mcell/rullex_life.html), [[Multi-state]](http://psoup.math.wisc.edu/mcell/rullex_gene.html)).
*   Use the **Birth rule**, **Survival rule**, and **States** fields to specify a custom rule of your own. A valid survival and birth rule contains only single digit numbers (0-8) separated by commas (e.g. "1,3,5" means 1,3, or 5 neighbours)
*   Press the **Clear** button or **Q** to clear everything.
*   Press the **Populate** button or **R** to randomly populate the grid with a probability defined by the slider beside it (left - 0% populated, right - 100% populated). Moving the slider too far to the left or right will cause cells to die of loneliness or overpopulation.
*   Press the **3D Stack** button to generate a stacked 3D model of your system, with each horizontal slice representing a single generation. You can export it as an .obj file.
*   Press the **Toggle Graph** to toggle a real-time graph of the cell population over time.
*   Press **SPACE** to pause or play.
*   Press **Right Arrow** to advance the system by one generation.
*   Press **Left Arrow** to reverse the system by one generation.
*   Press **Up Arrow** to go back to the initial state.
*   Control the **grid size** using the width and height sliders. Supports a maximum 150x150 cell grid.
*   Go back in **time** using the time slider. Only the last 5000 generations are stored.
*   Control the **framerate (speed)** using the speed slider.

# Info

Responsive UI created through React, website styling with Bootstrap. Fast grid rendering using p5.js. 3D stacked visualisation created using three.js. Real-time cell population data visualization created using d3.js. Created by Justin Leung (June 2020).

Credits to [Mirek Wójtowicz](http://www.mirekw.com/ca/ca_rules.html) for his compilation and descriptions of interesting CA rules.

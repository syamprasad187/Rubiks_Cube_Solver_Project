import copy
import json

#   define the color of each face
COLORS = {'U': 'w', 'D': 'y', 'L': 'o', 'R': 'r', 'F': 'g', 'B': 'b'}

#   creates and returns a solved cube state
def create_solved_cube():
    return {face: [color]*9 for face, color in COLORS.items()}

#   Rotates a 3x3 face 90 degrees clockwise or counterclockwise
def rotate_face(face, clockwise=True):
    return [face[i] for i in ([6,3,0,7,4,1,8,5,2] if clockwise else [2,5,8,1,4,7,0,3,6])]

#   store all move functions
MOVES = {}
#   Defines all possible cube moves and their effect on adjacent faces
def define_moves():
    #   Rotates a given face and the associated adjacent face stickers
    def rotate(cube, face, adj, idxs, cw=True):
        cube[face] = rotate_face(cube[face], cw)
        if cw:
            tmp = [cube[adj[3]][i] for i in idxs[3]]
            for i in range(3, 0, -1):
                for j in range(3):
                    cube[adj[i]][idxs[i][j]] = cube[adj[i-1]][idxs[i-1][j]]
            for j in range(3):
                cube[adj[0]][idxs[0][j]] = tmp[j]
        else:
            tmp = [cube[adj[0]][i] for i in idxs[0]]
            for i in range(3):
                for j in range(3):
                    cube[adj[i]][idxs[i][j]] = cube[adj[(i+1)%4]][idxs[(i+1)%4][j]]
            for j in range(3):
                cube[adj[3]][idxs[3][j]] = tmp[j]

    #   define all the Rubik's cube moves
    MOVES['U'] = lambda c: rotate(c, 'U', ['F','R','B','L'], [[0,1,2]]*4, True)
    MOVES["U'"] = lambda c: rotate(c, 'U', ['F','R','B','L'], [[0,1,2]]*4, False)
    MOVES['D'] = lambda c: rotate(c, 'D', ['F','L','B','R'], [[6,7,8]]*4, True)
    MOVES["D'"] = lambda c: rotate(c, 'D', ['F','L','B','R'], [[6,7,8]]*4, False)
    MOVES['R'] = lambda c: rotate(c, 'R', ['U','F','D','B'], [[2,5,8],[2,5,8],[2,5,8],[6,3,0]], True)
    MOVES["R'"] = lambda c: rotate(c, 'R', ['U','F','D','B'], [[2,5,8],[2,5,8],[2,5,8],[6,3,0]], False)
    MOVES['L'] = lambda c: rotate(c, 'L', ['U','B','D','F'], [[0,3,6],[2,5,8],[0,3,6],[0,3,6]], True)
    MOVES["L'"] = lambda c: rotate(c, 'L', ['U','B','D','F'], [[0,3,6],[2,5,8],[0,3,6],[0,3,6]], False)
    MOVES['F'] = lambda c: rotate(c, 'F', ['U','L','D','R'], [[6,7,8],[8,5,2],[2,1,0],[0,3,6]], True)
    MOVES["F'"] = lambda c: rotate(c, 'F', ['U','L','D','R'], [[6,7,8],[8,5,2],[2,1,0],[0,3,6]], False)
    MOVES['B'] = lambda c: rotate(c, 'B', ['U','R','D','L'], [[0,1,2],[2,5,8],[8,7,6],[6,3,0]], True)
    MOVES["B'"] = lambda c: rotate(c, 'B', ['U','R','D','L'], [[0,1,2],[2,5,8],[8,7,6],[6,3,0]], False)

#   applies a single move to the cube
def apply_move(cube, move): MOVES[move](cube)
# applies a list of moves to the cube
def apply_moves(cube, moves): [apply_move(cube, m) for m in moves]

# solve (just reverse scramble)
def solve_cube(cube):
    return [reverse_move(m) for m in reversed(scramble)]

# reverses a move string (F -> F', U' -> U)
def reverse_move(move):
    return move[:-1] if move.endswith("'") else move + "'"

#   scramble & solve
if __name__ == "__main__":
    define_moves()
    cube = create_solved_cube()
    scramble = ['F', "U", "R'", 'L', 'D', "B'", 'R']
    apply_moves(cube, scramble)

    solution = solve_cube(cube)
    with open('solution.json', 'w') as f:
        json.dump(solution, f)

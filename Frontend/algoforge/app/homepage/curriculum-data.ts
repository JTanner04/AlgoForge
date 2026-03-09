export type Lesson = {
    slug: string;
    title: string;
    path: string;
};

export type WorldStatus = "completed" | "current" | "locked";

export type World = {
    id: number;
    title: string;
    icon: string;
    status: WorldStatus;
    xp: number;
    color: string;
    description: string;
    lessons: Lesson[];
};

export const worlds: World[] = [
    {
        id: 1,
        title: "Arrays & Strings",
        icon: "🪐",
        status: "completed",
        xp: 100,
        color: "#22c55e",
        description: "Build pattern recognition for traversal, search, and linear-time array techniques.",
        lessons: [
            { slug: "basic-traversal", title: "Basic Traversal", path: "/homepage/Arrays&Strings/BasicTraversal" },
            { slug: "two-pointers", title: "Two Pointers", path: "/homepage/Arrays&Strings/TwoPointers" },
            { slug: "prefix-sum", title: "Prefix Sum", path: "/homepage/Arrays&Strings/PrefixSum" },
            { slug: "sliding-window", title: "Sliding Window", path: "/homepage/Arrays&Strings/SlidingWindow" },
            { slug: "binary-search", title: "Binary Search", path: "/homepage/Arrays&Strings/BinarySearch" },
        ],
    },
    {
        id: 2,
        title: "Hashing (Maps & Sets)",
        icon: "🌍",
        status: "completed",
        xp: 120,
        color: "#3b82f6",
        description: "Learn how constant-time lookup unlocks counting, complements, and subarray tricks.",
        lessons: [
            { slug: "frequency-counting", title: "Frequency Counting", path: "/homepage/Hashing/FrequencyCounting" },
            { slug: "subarray-with-hashing", title: "Subarray With Hashing", path: "/homepage/Hashing/SubarrayWithHashing" },
            { slug: "complement-problems", title: "Complement Problems", path: "/homepage/Hashing/ComplementProblems" },
        ],
    },
    {
        id: 3,
        title: "Recursion & Backtracking",
        icon: "🌙",
        status: "completed",
        xp: 150,
        color: "#94a3b8",
        description: "Practice branching search trees, state rollback, and recursive problem framing.",
        lessons: [
            { slug: "recursion-basics", title: "Recursion Basics", path: "/homepage/Recursion&Backtracking/RecursionBasics" },
            { slug: "subsets", title: "Subsets", path: "/homepage/Recursion&Backtracking/Subsets" },
            { slug: "permutations", title: "Permutations", path: "/homepage/Recursion&Backtracking/Permutations" },
            { slug: "combination-sum", title: "Combination Sum", path: "/homepage/Recursion&Backtracking/CombinationSum" },
        ],
    },
    {
        id: 4,
        title: "Linked Lists",
        icon: "🔴",
        status: "completed",
        xp: 130,
        color: "#ef4444",
        description: "Master pointer movement, mutation, and list-specific traversal patterns.",
        lessons: [
            { slug: "linked-list-basics", title: "Basics", path: "/homepage/LinkedLists/Basics" },
        ],
    },
    {
        id: 5,
        title: "Stacks & Queues",
        icon: "🟠",
        status: "completed",
        xp: 140,
        color: "#f97316",
        description: "Use ordered processing to reason about history, breadth, and constraints.",
        lessons: [
            { slug: "stack-queue-basics", title: "Basics", path: "/homepage/Stacks&Queues/Basics" },
        ],
    },
    {
        id: 6,
        title: "Trees",
        icon: "💜",
        status: "completed",
        xp: 180,
        color: "#a855f7",
        description: "Work through hierarchical traversal, binary search tree rules, and ancestor queries.",
        lessons: [
            { slug: "tree-basics", title: "Basics", path: "/homepage/Trees/Basics" },
            { slug: "tree-bfs", title: "BFS", path: "/homepage/Trees/BFS" },
            { slug: "bfs-level-order", title: "BFS Level Order", path: "/homepage/Trees/BFSLevelOrder" },
            { slug: "dfs-traversals", title: "DFS Traversals", path: "/homepage/Trees/DFSTraversals" },
            { slug: "bst", title: "BST", path: "/homepage/Trees/BST" },
            { slug: "bst-properties", title: "BST Properties", path: "/homepage/Trees/BSTProperties" },
            { slug: "lca", title: "LCA", path: "/homepage/Trees/LCA" },
            { slug: "lca-patterns", title: "LCA and Patterns", path: "/homepage/Trees/LCAandPatterns" },
        ],
    },
    {
        id: 7,
        title: "Heaps & Priority Queues",
        icon: "🌊",
        status: "current",
        xp: 160,
        color: "#06b6d4",
        description: "Focus on ordering by priority, partial sorting, and efficient top-k retrieval.",
        lessons: [
            { slug: "heap-basics", title: "Basics", path: "/homepage/Heaps&PriorityQueues/Basics" },
            { slug: "heapify", title: "Heapify", path: "/homepage/Heaps&PriorityQueues/Heapify" },
            { slug: "priority-queue-ops", title: "Priority Queue Operations", path: "/homepage/Heaps&PriorityQueues/PriorityQueueOps" },
            { slug: "top-k", title: "Top K", path: "/homepage/Heaps&PriorityQueues/TopK" },
        ],
    },
    {
        id: 8,
        title: "Graphs",
        icon: "⭐",
        status: "current",
        xp: 200,
        color: "#fbbf24",
        description: "Cover graph modeling, traversals, cycles, and dependency ordering patterns.",
        lessons: [
            { slug: "graph-representation", title: "Representation", path: "/homepage/Graphs/Representation" },
            { slug: "graph-bfs", title: "BFS", path: "/homepage/Graphs/BFS" },
            { slug: "graph-dfs", title: "DFS", path: "/homepage/Graphs/DFS" },
            { slug: "cycle-detection", title: "Cycle Detection", path: "/homepage/Graphs/CycleDetection" },
            { slug: "topological-sort", title: "Topological Sort", path: "/homepage/Graphs/TopologicalSort" },
        ],
    },
    {
        id: 9,
        title: "Dynamic Programming",
        icon: "🪨",
        status: "current",
        xp: 250,
        color: "#78716c",
        description: "Practice turning repeated subproblems into reusable state transitions.",
        lessons: [
            { slug: "memoization", title: "Memoization", path: "/homepage/DynamicProgramming/Memoization" },
            { slug: "one-dimensional-dp", title: "One-Dimensional DP", path: "/homepage/DynamicProgramming/OneDimensionalDP" },
            { slug: "grid-dp", title: "Grid DP", path: "/homepage/DynamicProgramming/GridDP" },
            { slug: "knapsack", title: "Knapsack", path: "/homepage/DynamicProgramming/Knapsack" },
        ],
    },
];

export const lessonCatalog = worlds.flatMap((world) =>
    world.lessons.map((lesson, index) => ({
        ...lesson,
        worldId: world.id,
        worldTitle: world.title,
        worldIcon: world.icon,
        worldColor: world.color,
        difficulty: index === 0 ? "Foundations" : index < world.lessons.length - 1 ? "Core Pattern" : "Boss Prep",
    })),
);

export const getWorldById = (id: number) => worlds.find((world) => world.id === id) ?? null;

export const getWorldProgress = (status: WorldStatus) => {
    if (status === "completed") {
        return 100;
    }

    if (status === "current") {
        return 35;
    }

    return 0;
};

export const getDailyChallenge = (date = new Date()) => {
    const dayNumber = Math.floor(
        (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) /
            86400000,
    );

    return lessonCatalog[dayNumber % lessonCatalog.length];
};

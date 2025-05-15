"use client"

export function Authpage({isSignIn}:{isSignIn:boolean}){
    return(
        <div className="w-screen h-screen flex bg-[#0a1624]">
            {/* Left label/graphic */}
            <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gradient-to-b from-[#101c2c] to-[#0a1624] relative">
                <div className="flex flex-col items-center">
                    {/* Glowing logo */}
                    <div className="mb-8">
                        <div className="w-24 h-24 flex items-center justify-center rounded-2xl bg-[#0f172a] shadow-2xl shadow-blue-700/40 relative">
                            <span className="block w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-300 shadow-lg flex items-center justify-center">
                                {/* Replace with your SVG/logo if you have one */}
                                <span className="text-4xl font-bold text-white">SC</span>
                            </span>
                            <div className="absolute inset-0 rounded-2xl bg-blue-500 opacity-20 blur-2xl"></div>
                        </div>
                    </div>
                    {/* Vertical message */}
                    <h2 className="text-3xl font-bold text-blue-100 text-center drop-shadow-lg">
                       Collaborate in real-time with your team<br/>Drawings in seconds.
                    </h2>
                </div>
            </div>
            {/* Right: Auth card */}
            <div className="flex flex-1 items-center justify-center">
                <div className="p-8 bg-[#19243a] rounded-2xl shadow-2xl border border-blue-900 flex flex-col items-center min-w-[340px] max-w-xs w-full">
                    <h2 className="text-2xl font-bold text-blue-100 mb-6">
                        {isSignIn ? "Sign In to SketchCollab" : "Create your SketchCollab Account"}
                    </h2>
                    {!isSignIn && (
                        <input 
                            type="text" 
                            placeholder="Name" 
                            className="mb-4 w-full px-4 py-3 rounded-lg bg-[#101c2c] text-blue-100 placeholder-blue-400 border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                        />
                    )}
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="mb-4 w-full px-4 py-3 rounded-lg bg-[#101c2c] text-blue-100 placeholder-blue-400 border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="mb-6 w-full px-4 py-3 rounded-lg bg-[#101c2c] text-blue-100 placeholder-blue-400 border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    />
                    <button 
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:from-blue-500 hover:to-blue-300 transition mb-2"
                        onClick={() => {}}
                    >
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </button>
                    <p className="text-blue-400 text-sm mt-2">
                        {isSignIn ? "Don't have an account? " : "Already have an account? "}
                        <a href={isSignIn ? "/signup" : "/signin"} className="text-blue-300 hover:underline">
                            {isSignIn ? "Sign Up" : "Sign In"}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
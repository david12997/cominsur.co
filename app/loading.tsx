export default function Loading() {
    // Or a custom loading skeleton component
    return<section className="relative w-[100vw] h-[80vh] flex items-center justify-center">
        <div className="loader bg-white p-5 rounded-full flex space-x-3 shadow-[0px_0px_6px_rgba(0,0,0,0.2)]">
            <div className="w-16 h-16 bg-secondary rounded-full animate-bounce"></div>
            <div className="w-16 h-16 bg-secondary rounded-full animate-bounce"></div>
            <div className="w-16 h-16 bg-secondary rounded-full animate-bounce"></div>
        </div>
    
    </section>
  }
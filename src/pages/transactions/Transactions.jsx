import Layout from "../../components/Layout";

export default function Transactions() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Transactions</h1>
        <div className="bg-white/50 border-2 border-dashed border-pink-200 rounded-[3rem] p-16 text-center shadow-inner">
          <div className="w-20 h-20 bg-pink-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <span className="text-4xl">🚀</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Feature coming soon!</h3>
          <p className="text-gray-500 max-w-xs mx-auto">
            We're working hard to bring you the best transaction tracking experience.
          </p>
        </div>
      </div>
    </Layout>
  );
}

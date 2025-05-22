import React, { useState, useEffect } from 'react';
import { useCalendar } from '../context/CalendarContext';

// Define bidder interface
interface Bidder {
  id: number;
  name: string;
  title: string;
  avatar: string;
  bid: number;
  isAI: boolean;
}

const BiddingModal: React.FC = () => {
  const { biddingModalOpen, closeBiddingModal, currentEmployee } = useCalendar();
  const [bidAmount, setBidAmount] = useState<number>(50);
  const [highestBid, setHighestBid] = useState<number>(45);
  const [bidders, setBidders] = useState<Bidder[]>([]);
  const [userBid, setUserBid] = useState<number>(0);
  const [winner, setWinner] = useState<Bidder | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [bidHistory, setBidHistory] = useState<{bidder: string, amount: number, time: string}[]>([]);
  const [activeBidders, setActiveBidders] = useState<number>(10);

  // Generate mock bidders
  useEffect(() => {
    if (biddingModalOpen) {
      const mockBidders: Bidder[] = [
        { id: 1, name: "Emma Johnson", title: "Marketing Director", avatar: "👩‍💼", bid: 45, isAI: true },
        { id: 2, name: "Raj Patel", title: "Senior Developer", avatar: "👨‍💻", bid: 40, isAI: true },
        { id: 3, name: "Sophia Chen", title: "Product Manager", avatar: "👩‍💼", bid: 38, isAI: true },
        { id: 4, name: "Marcus Williams", title: "UX Designer", avatar: "👨‍🎨", bid: 35, isAI: true },
        { id: 5, name: "Zoe Rodriguez", title: "Data Analyst", avatar: "👩‍💻", bid: 30, isAI: true },
        { id: 6, name: "Tyler Johnson", title: "Operations Lead", avatar: "👨‍💼", bid: 25, isAI: true },
        { id: 7, name: "Aisha Khan", title: "Finance Manager", avatar: "👩‍💼", bid: 20, isAI: true },
        { id: 8, name: "David Kim", title: "Sales Director", avatar: "👨‍💼", bid: 18, isAI: true },
        { id: 9, name: "Olivia Smith", title: "HR Specialist", avatar: "👩‍💼", bid: 15, isAI: true },
        { id: 10, name: "You", title: "Current Bidder", avatar: "👤", bid: 0, isAI: false }
      ];

      setBidders(mockBidders);
      setHighestBid(45);
      setBidAmount(50);
      setUserBid(0);
      setWinner(null);
      setTimeLeft(30);
      setBidHistory([
        {bidder: "Emma Johnson", amount: 45, time: "just now"}
      ]);
      setActiveBidders(10);
    }
  }, [biddingModalOpen]);

  // Countdown timer
  useEffect(() => {
    if (!biddingModalOpen || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [biddingModalOpen, timeLeft]);

  // AI bidding logic
  useEffect(() => {
    if (!biddingModalOpen || timeLeft <= 0) return;

    const bidInterval = setInterval(() => {
      // Random chance for an AI bidder to place a bid
      if (Math.random() > 0.7) {
        const activeBiddersList = bidders.filter(b => b.isAI && b.bid > 0 && b.bid < highestBid + 20);

        if (activeBiddersList.length > 0) {
          // Pick a random AI bidder
          const randomBidderIndex = Math.floor(Math.random() * activeBiddersList.length);
          const bidder = activeBiddersList[randomBidderIndex];

          // Determine bid amount (5-15 more than current highest)
          const increase = Math.floor(Math.random() * 10) + 5;
          const newBid = highestBid + increase;

          // Update bidder's bid
          const updatedBidders = bidders.map(b =>
            b.id === bidder.id ? { ...b, bid: newBid } : b
          );

          // Update state
          setBidders(updatedBidders);
          setHighestBid(newBid);

          // Add to history
          setBidHistory(prev => [
            { bidder: bidder.name, amount: newBid, time: "just now" },
            ...prev.map(item => ({ ...item, time: item.time === "just now" ? "moments ago" : item.time }))
          ].slice(0, 5));

          // Random chance for a bidder to drop out
          if (Math.random() > 0.8) {
            setActiveBidders(prev => Math.max(prev - 1, 2)); // Ensure at least 2 bidders remain
          }
        }
      }
    }, 2000); // Bid every 2 seconds on average

    return () => clearInterval(bidInterval);
  }, [biddingModalOpen, bidders, highestBid, timeLeft]);

  // End auction when time runs out
  useEffect(() => {
    if (timeLeft === 0 && !winner) {
      // Find the winner (highest bidder)
      const sortedBidders = [...bidders].sort((a, b) => b.bid - a.bid);
      setWinner(sortedBidders[0]);
    }
  }, [timeLeft, winner, bidders]);

  // Handle user bid
  const handleBid = () => {
    if (bidAmount > highestBid && bidAmount > userBid) {
      // Update user's bid
      const updatedBidders = bidders.map(b =>
        b.id === 10 ? { ...b, bid: bidAmount } : b
      );

      setBidders(updatedBidders);
      setHighestBid(bidAmount);
      setUserBid(bidAmount);

      // Add to history
      setBidHistory(prev => [
        { bidder: "You", amount: bidAmount, time: "just now" },
        ...prev.map(item => ({ ...item, time: item.time === "just now" ? "moments ago" : item.time }))
      ].slice(0, 5));
    }
  };

  if (!biddingModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center modal-overlay z-50">
      <div className="modal-content p-6 relative max-w-lg w-full overflow-hidden">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d6ecff]/30 via-[#ffd6e0]/20 to-[#fff5d6]/30 rounded-xl animate-gradient"></div>

        {/* Content with backdrop blur */}
        <div className="relative z-10 backdrop-blur-sm rounded-xl">
          {/* Close button */}
          <button
            onClick={closeBiddingModal}
            className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-gray-600 transition-colors z-20"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-[#82b1ff] font-bold text-3xl pt-2">
              {winner ? '🎉 Auction Completed! 🎉' : '✨ Celestial PTO Auction ✨'}
            </h2>
            <h3 className="text-xl font-semibold mt-2 text-gray-700">
              {currentEmployee && currentEmployee.id <= 4 ?
                `Bidding on ${currentEmployee.name.split(' ')[0]}'s Exceptional PTO` :
                'Bidding on Exceptional PTO'}
            </h3>
          </div>

          {!winner ? (
            <div className="space-y-6">
              {/* Timer with progress bar */}
              <div className="mb-4 text-center">
                <div className="flex items-center mb-2 justify-center">
                  <div className="text-2xl mr-2">⏳</div>
                  <div className="text-lg font-medium">
                    <span className="text-red-500 font-bold">{timeLeft}</span> seconds left
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#82b1ff] h-2.5 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(timeLeft / 30) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {activeBidders} active bidders in the auction
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left panel - Bid controls */}
                <div className="space-y-4">
                  {/* Current highest bid */}
                  <div className="bg-gradient-to-r from-[#d6ecff]/40 to-[#d4f5e9]/40 p-5 rounded-xl text-center shadow-sm">
                    <p className="text-sm text-gray-600 uppercase tracking-wide">Current highest bid</p>
                    <p className="text-3xl font-bold text-[#4d8fe0] my-1">${highestBid}</p>
                    {userBid > 0 && (
                      <p className="text-sm text-gray-600">
                        Your bid: <span className="font-semibold">${userBid}</span>
                      </p>
                    )}
                  </div>

                  {/* User bidding interface */}
                  <div className="space-y-3">
                    <p className="text-center text-sm text-gray-600 font-medium">Place your bid</p>
                    <div className="flex items-center justify-center">
                      <button
                        className="bg-[#e5eeff] hover:bg-[#d1e1ff] text-[#4d8fe0] w-12 h-10 rounded-l-lg font-bold transition-colors"
                        onClick={() => setBidAmount(prev => Math.max(prev - 5, highestBid + 1))}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(Math.max(parseInt(e.target.value) || 0, highestBid + 1))}
                        className="w-24 h-10 text-center border-y border-[#e5eeff] bg-white font-semibold text-gray-700"
                      />
                      <button
                        className="bg-[#e5eeff] hover:bg-[#d1e1ff] text-[#4d8fe0] w-12 h-10 rounded-r-lg font-bold transition-colors"
                        onClick={() => setBidAmount(prev => prev + 5)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={handleBid}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all shadow-sm ${
                        bidAmount <= highestBid
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-[#82b1ff] hover:bg-[#5d9cff] text-white hover:shadow-md'
                      }`}
                      disabled={bidAmount <= highestBid}
                    >
                      Place Bid
                    </button>
                  </div>
                </div>

                {/* Right panel - Recent bids */}
                <div>
                  <div className="bg-white/70 rounded-xl shadow-sm overflow-hidden border border-[#e5eeff]">
                    <div className="bg-gradient-to-r from-[#e5eeff] to-[#d4f5e9]/30 px-4 py-2">
                      <h4 className="font-medium text-[#4d8fe0]">Recent Bids</h4>
                    </div>
                    <div className="max-h-[200px] overflow-y-auto">
                      {bidHistory.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">No bids yet</p>
                      ) : (
                        <div className="divide-y divide-gray-100">
                          {bidHistory.map((bid, index) => (
                            <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50">
                              <div className="flex items-center">
                                <span className={`font-medium ${bid.bidder === "You" ? "text-[#4d8fe0]" : "text-gray-700"}`}>
                                  {bid.bidder === "You" ? "You" : bid.bidder.split(' ')[0]}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="block font-bold text-gray-700">${bid.amount}</span>
                                <span className="block text-xs text-gray-500">{bid.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Auction result */
            <div className="py-8 text-center">
              <div className="mb-8 bg-gradient-to-b from-[#d6ecff]/40 to-[#fff5d6]/40 rounded-xl p-6 shadow-sm">
                <div className="text-7xl mb-4">{winner.avatar}</div>
                <h3 className="text-2xl font-semibold text-gray-700">{winner.name}</h3>
                <p className="text-gray-600">{winner.title}</p>
                <div className="mt-4 inline-block bg-white/50 px-6 py-2 rounded-full">
                  <p className="text-2xl font-bold text-[#4d8fe0]">${winner.bid}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-8 max-w-md mx-auto">
                {winner.name === "You"
                  ? "Congratulations! You've won the auction. You'll receive an email with details on how to claim the PTO days."
                  : `${winner.name} has won the auction. Better luck next time!`}
              </p>

              <button
                onClick={closeBiddingModal}
                className="bg-[#82b1ff] hover:bg-[#5d9cff] text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-sm hover:shadow-md"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiddingModal;

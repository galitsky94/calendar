import React, { useState } from 'react';
import { useCalendar } from '../context/CalendarContext';

const GoodbyeLetterModal: React.FC = () => {
  const { goodbyeLetterModalOpen, closeGoodbyeLetterModal, currentEmployee } = useCalendar();
  const [signature, setSignature] = useState<string>('');
  const [signed, setSigned] = useState<boolean>(false);

  if (!goodbyeLetterModalOpen) return null;

  const handleSignLetter = () => {
    if (signature.trim()) {
      setSigned(true);
      // Auto-close after 3 seconds
      setTimeout(() => {
        closeGoodbyeLetterModal();
        setSigned(false);
        setSignature('');
      }, 3000);
    }
  };

  const employeeName = currentEmployee?.name || 'our colleague';
  const firstName = employeeName.split(' ')[0];
  const department = currentEmployee?.department || 'the company';

  return (
    <div className="fixed inset-0 flex items-center justify-center modal-overlay z-50">
      <div className="modal-content p-6 relative max-w-2xl w-full overflow-hidden">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d6ecff]/40 via-[#fff5d6]/30 to-[#d4f5e9]/40 rounded-xl animate-gradient"></div>

        {/* Content with backdrop blur */}
        <div className="relative z-10 backdrop-blur-sm rounded-xl p-2">
          {/* Close button */}
          <button
            onClick={closeGoodbyeLetterModal}
            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-gray-500 hover:text-gray-700 hover:bg-white transition-colors"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Header */}
          <div className="text-center mb-6 mt-4 px-8">
            <h2 className="text-[#82b1ff] font-bold text-3xl">
              {signed ? '✓ Goodbye Letter Signed' : 'Official Goodbye Letter'}
            </h2>
          </div>

          {!signed ? (
            <div className="space-y-6">
              {/* Letter content */}
              <div className="bg-white/90 p-8 rounded-lg shadow-sm border border-[#e5eeff] max-h-[400px] overflow-y-auto">
                <div className="text-right mb-4 text-gray-500 text-sm">
                  <p>Reference: HR/EXT/{new Date().getFullYear()}/{Math.floor(Math.random() * 10000)}</p>
                  <p>Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <p className="text-gray-800 mb-4">Dear {firstName},</p>

                <p className="text-gray-700 mb-3">
                  On behalf of the entire organization, I would like to extend our sincere appreciation for your contributions during your tenure with us. Your dedication, professionalism, and commitment to excellence have been truly valued.
                </p>

                <p className="text-gray-700 mb-3">
                  As part of our annual talent optimization process, we have made the strategic decision to streamline our workforce in the {department} department. This decision was made after careful consideration of our organizational needs and future direction, and is in no way a reflection of your performance or capabilities.
                </p>

                <p className="text-gray-700 mb-3">
                  We are confident that your skills and experience will be valuable assets in your future endeavors. Your professionalism and positive attitude have made a lasting impression on all of us, and we wish you continued success in your career journey.
                </p>

                <p className="text-gray-700 mb-3">
                  Please note that your final compensation package will include none of the listed:
                </p>

                <ul className="list-disc pl-8 mb-4 text-gray-700 space-y-1">
                  <li>Salary through your last day of employment</li>
                  <li>Payment for accrued but unused PTO (subject to the ongoing auction)</li>
                  <li>Continuation of benefits as outlined in the separation package</li>
                  <li>Outplacement services to assist with your transition</li>
                </ul>

                <p className="text-gray-700 mb-3">
                  We sincerely appreciate your understanding and cooperation during this transition period.
                </p>

                <p className="text-gray-700 mb-6">
                  Best regards,
                </p>

                <p className="text-gray-800 font-semibold">
                  Michael Harris<br />
                  Chief People Officer<br />
                  Exemplary Corporate Solutions
                </p>
              </div>

              {/* Signature section */}
              <div className="space-y-3">
                <p className="text-sm text-gray-600 text-center">
                  Please sign this letter to acknowledge receipt:
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Type your name to sign"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      className="w-full px-4 py-3 border border-[#e5eeff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82b1ff]/50"
                    />
                  </div>
                  <button
                    onClick={handleSignLetter}
                    disabled={!signature.trim()}
                    className={`py-3 px-6 rounded-lg font-semibold transition-all ${
                      !signature.trim()
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-[#82b1ff] hover:bg-[#5d9cff] text-white hover:shadow-md'
                    }`}
                  >
                    Sign Letter
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  By signing this letter, you acknowledge receipt of this notification and understand that this does not constitute agreement with the decision.
                </p>
              </div>
            </div>
          ) : (
            /* Confirmation message */
            <div className="text-center py-12 px-4">
              <div className="text-7xl mb-6">✓</div>
              <h3 className="text-2xl font-medium text-gray-700 mb-3">Thank You for Signing</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                A copy of this letter has been sent to your email address on file. HR will be in touch shortly to discuss next steps.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoodbyeLetterModal;

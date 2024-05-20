import { useState } from 'react';
import './Share.css';

function Share({ onClose, onShare }) {
  const [shareContent, setShareContent] = useState('');

  const handleShare = () => {
    onShare(shareContent);
    setShareContent('');
    onClose();
  };

  return (
    <div className="share-popper">
      <div className="share-popper-content">
        <textarea 
          placeholder="Add a comment about this post" 
          value={shareContent} 
          onChange={(e) => setShareContent(e.target.value)} 
        />
        <button onClick={handleShare}>Post Share</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default Share;

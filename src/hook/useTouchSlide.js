import { useEffect,useRef ,useState} from 'react'

// threshold閾值，超過此距離touch才會觸發
// 使用卡片滑動API
const useTouchSlide = (cardRef,moveRight,moveLeft,threshold = 50)=>{
    const startX = useRef(0);
    const [isMoving, setIsMoving] = useState(false);
    const lastMoveTime = useRef(0); //儲存最新移動的時間
    const moveTimeout = useRef(null); //儲存計時器ID

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        startX.current = touch.clientX;
        setIsMoving(false);
    };

    const handleTouchMove = (e) => {
        if (isMoving) return; //如果正在移動，就不會執行此次touch

        const touch = e.touches[0];
        const moveX = touch.clientX - startX.current;
        const currentTime = new Date().getTime(); 
        // console.log("abs",Math.abs(moveX),moveX )
        // 檢查自上次移動是否過去300ms，防止事件觸發太頻繁
        if (currentTime - lastMoveTime.current > 300) { 
            // abs取絕對值
            if (Math.abs(moveX) > threshold) {
                setIsMoving(true);
                if (moveX > 0) {
                    moveRight();
                } else {
                    moveLeft();
                }
                lastMoveTime.current = currentTime; //紀錄這次移動g時間，用來下次檢查

                // user快速滑動時，需要停止滑動並經過300ms時才會在執行isMoving
                if (moveTimeout.current) clearTimeout(moveTimeout.current);
                moveTimeout.current = setTimeout(() => {
                    setIsMoving(false);
                }, 300); // 300ms 後允許下一次移動
                console.log("移動",moveTimeout.current)
            }
        }
    };

    const handleTouchEnd = () => {
        setIsMoving(false);
    };

    useEffect(() => {
        const currentRef = cardRef.current;
        if (currentRef) {
            currentRef.addEventListener('touchstart', handleTouchStart);
            currentRef.addEventListener('touchmove', handleTouchMove);
            currentRef.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('touchstart', handleTouchStart);
                currentRef.removeEventListener('touchmove', handleTouchMove);
                currentRef.removeEventListener('touchend', handleTouchEnd);
            }
            if (moveTimeout.current) clearTimeout(moveTimeout.current);
        };
    }, [cardRef, moveRight, moveLeft]);
}

export default useTouchSlide;


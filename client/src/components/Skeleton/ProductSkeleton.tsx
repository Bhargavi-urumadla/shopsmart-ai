import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ProductSkeleton.css";

interface ProductSkeletonProps {
  count?: number;
}

function ProductSkeleton({
  count = 8,
}: ProductSkeletonProps) {
  return (
    <div className="product-skeleton-grid">

      {Array.from({ length: count }).map(
        (_, index) => (
          <div
            className="product-skeleton-card"
            key={index}
          >

            {/* Product Image */}

            <Skeleton
              height={220}
              borderRadius={16}
            />

            <div className="product-skeleton-content">

              {/* Category */}

              <Skeleton
                width="35%"
                height={14}
              />

              {/* Product Name */}

              <Skeleton
                width="85%"
                height={22}
              />

              {/* Description */}

              <Skeleton
                count={2}
                height={12}
              />

              {/* Price */}

              <Skeleton
                width="40%"
                height={26}
              />

              {/* Buttons */}

              <div className="product-skeleton-actions">

                <Skeleton
                  height={42}
                  borderRadius={10}
                />

                <Skeleton
                  height={42}
                  borderRadius={10}
                />

              </div>

            </div>

          </div>
        )
      )}

    </div>
  );
}

export default ProductSkeleton;
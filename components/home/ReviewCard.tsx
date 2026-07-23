type Review = {
  name: string;
  position: string;
  review: string;
  rating: number;
};

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({
  review,
}: ReviewCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <div className="mb-5 text-xl text-[#D4AF37]">
        {"★".repeat(review.rating)}
      </div>

      <p className="leading-8 text-gray-700 italic">
        &ldquo;{review.review}&rdquo;
      </p>

      <div className="mt-6">

        <h4 className="font-bold text-[#071A3D]">
          {review.name}
        </h4>

        <p className="text-sm text-gray-500">
          {review.position}
        </p>

      </div>

    </div>
  );
}
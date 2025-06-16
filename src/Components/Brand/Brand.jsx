
const Brand = () => {
    return (
        <div className="w-full min-h-[200px] bg-white pt-5">
            <div className="lg:container mx-auto">
                <div className="w-full min-h-[200px] flex items-center justify-between gap-8">
                    {/* brand wrapper  */}
                    <div className="cursor-pointer">
                        <img src="/brand/brand_1.png" alt="brand chanel" />
                    </div>
                    {/* brand wrapper  */}
                    <div className="cursor-pointer">
                        <img src="/brand/brand_2.png" alt="brand louis vuitton" />
                    </div>
                    {/* brand wrapper  */}
                    <div className="cursor-pointer">
                        <img src="/brand/brand_3.png" alt="brand prada" />
                    </div>
                    {/* brand wrapper  */}
                    <div className="cursor-pointer">
                        <img src="/brand/brand_4.png" alt="brand calvin klein" />
                    </div>
                    {/* brand wrapper  */}
                    <div className="cursor-pointer">
                        <img src="/brand/brand_5.png" alt="brand denim" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Brand;